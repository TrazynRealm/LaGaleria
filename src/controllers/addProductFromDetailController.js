// controllers/addProductFromDetailController.js

const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCartFromDetail = async (req, res) => {
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

        // Redirecciona al usuario a la vista del carrito
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al agregar producto al carrito');
    }
};
