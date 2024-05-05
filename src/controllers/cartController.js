const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.session.user._id;

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

        res.status(200).send('Producto agregado al carrito exitosamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al agregar producto al carrito');
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.session.user._id;

        // Busca el carrito del usuario
        const cart = await Cart.findOne({ user: userId });

        // Encuentra el índice del producto en el carrito
        const productIndex = cart.products.findIndex(item => item.product.equals(productId));

        // Si el producto está en el carrito, elimínalo
        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1); // Elimina el producto del carrito
            await cart.save(); // Guarda el carrito actualizado en la base de datos
            res.status(200).send('Producto eliminado del carrito exitosamente');
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
        const { productId, quantity } = req.body;
        const userId = req.session.user._id;

        // Busca el carrito del usuario
        const cart = await Cart.findOne({ user: userId });

        // Encuentra el índice del producto en el carrito
        const productIndex = cart.products.findIndex(item => item.product.equals(productId));

        // Si el producto está en el carrito, actualiza su cantidad
        if (productIndex !== -1) {
            cart.products[productIndex].quantity = quantity;
            await cart.save(); // Guarda el carrito actualizado en la base de datos
            res.status(200).send('Cantidad de producto en el carrito actualizada exitosamente');
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
        const userId = req.session.user._id;

        // Busca el carrito del usuario
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        res.json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener el carrito del usuario');
    }
};
