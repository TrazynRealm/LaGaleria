const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getTotalItems = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.json({ totalItems: 0 });
        }

        const userId = req.session.user._id;
        const cart = await Cart.findOne({ user: userId });
        const totalItems = cart ? cart.products.reduce((acc, item) => acc + item.quantity, 0) : 0;
        
        res.json({ totalItems });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener el total de productos en el carrito');
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.session.user._id;

        // Verificar si hay un mensaje de notificación en la sesión
        const notification = req.session.notification;
        delete req.session.notification;

        // Busca el producto por su ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        // Busca el carrito del usuario
        let cart = await Cart.findOne({ user: userId });

        // Si el usuario no tiene un carrito, crea uno nuevo
        if (!cart) {
            cart = new Cart({
                user: userId,
                products: []
            });
        }

        // Agrega el producto al carrito o incrementa su cantidad si ya está presente
        const existingProductIndex = cart.products.findIndex(item => item.product.equals(productId));
        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, incrementa su cantidad
            cart.products[existingProductIndex].quantity += 1;
        } else {
            // Si el producto no está en el carrito, agrégalo con una cantidad inicial de 1
            cart.products.push({ product: productId, quantity: 1 });
        }

        // Guarda el carrito actualizado en la base de datos
        await cart.save();

        // Establece la notificación en la sesión
        req.session.notification = `${product.name} agregado al carrito exitosamente`;

        // Redirecciona al usuario de regreso a la página de productos después de agregar el producto al carrito
        res.redirect('/products');

        // Envía una respuesta vacía con un código de estado 200 para indicar que la operación fue exitosa
        res.status(200).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al agregar producto al carrito');
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.session.user._id;

        // Busca el producto por su ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        // Busca el carrito del usuario
        const cart = await Cart.findOne({ user: userId });

        // Encuentra el índice del producto en el carrito
        const productIndex = cart.products.findIndex(item => item.product.equals(productId));

        // Si el producto está en el carrito, elimínalo
        if (productIndex !== -1) {
            // Elimina el producto del carrito
            cart.products.splice(productIndex, 1);
            // Guarda el carrito actualizado en la base de datos
            await cart.save();
            // Agrega un mensaje de notificación
            req.session.notification = `${product.name} eliminado del carrito exitosamente`;
            // Redirige de nuevo al carrito
            res.redirect('/cart');
        } else {
            res.status(404).send('Producto no encontrado en el carrito');
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar producto del carrito');
    }
};

exports.updateCartItemQuantity = async (req, res) => {
    try {
        const { productId, action } = req.body;
        const userId = req.session.user._id;

        // Busca el producto por su ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        // Busca el carrito del usuario
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }

        // Encuentra el índice del producto en el carrito
        const productIndex = cart.products.findIndex(item => item.product.equals(productId));

        if (productIndex !== -1) {
            // Aumentar o disminuir la cantidad basado en la acción
            if (action === 'increase') {
                cart.products[productIndex].quantity += 1;
                // Agrega un mensaje de notificación
                req.session.notification = `${product.name} añadido carrito exitosamente`;
            } else if (action === 'decrease') {
                cart.products[productIndex].quantity -= 1;
                // Agrega un mensaje de notificación
                req.session.notification = `${product.name} eliminado del carrito exitosamente`;
                // Eliminar el producto si la cantidad es menor o igual a 0
                if (cart.products[productIndex].quantity <= 0) {
                    cart.products.splice(productIndex, 1);
                }
            }
            await cart.save(); // Guarda el carrito actualizado en la base de datos
            res.redirect('/cart'); // Redirige de nuevo al carrito
        } else {
            res.status(404).send('Producto no encontrado en el carrito');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar la cantidad de producto en el carrito');
    }
};


exports.getCart = async (req, res) => {
    try {

        // Verificar si hay un mensaje de notificación en la sesión
        const notification = req.session.notification;
        delete req.session.notification;

        // Verificar si el usuario está autenticado
        if (!req.session.user) {
            return res.status(401).send('Usuario no autenticado');
        }

        // Verificar si req.session.user tiene la estructura esperada
        if (!req.session.user._id) {
            return res.status(400).send('ID de usuario no encontrado en la sesión del usuario');
        }

        // Imprimir el ID de usuario en la consola del servidor
        console.log('ID de usuario:', req.session.user._id);

        const userId = req.session.user._id;

        // Busca el carrito del usuario
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        // Renderiza la vista 'cart' con el carrito como contexto
        res.render('cart', { cart, notification });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener el carrito del usuario');
    }
};



