const Cart = require('../models/cart');
const Order = require('../models/order');

exports.getCheckout = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }

    const userId = req.session.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('products.product');

    if (!cart || cart.products.length === 0) {
        return res.redirect('/cart');
    }

    res.render('checkout', { cart });
};

exports.processCheckout = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        console.log('User session:', req.session.user);
        const userId = req.session.user ? req.session.user._id : null;
        console.log('User ID:', userId);
        
        const cart = await Cart.findOne({ user: userId }).populate('products.product');

        if (!cart || cart.products.length === 0) {
            return res.redirect('/cart');
        }

        const { name, address, city, state, zip, country, cardNumber } = req.body;

        if (!name || !address || !city || !state || !zip || !country || !cardNumber) {
            return res.status(400).send('Todos los campos son obligatorios');
        }

        const order = new Order({
            user: userId,
            products: cart.products.map(item => ({
                product: item.product._id,
                quantity: item.quantity
            })),
            total: cart.products.reduce((total, item) => total + item.product.price * item.quantity, 0),
            status: 'completed',
            name,
            address,
            city,
            state,
            zip,
            country,
            cardNumber: cardNumber.slice(-4) // Guardamos solo los últimos 4 dígitos para mostrar
        });

        await order.save();

        // Popula los productos del pedido para usarlos en la vista
        const populatedOrder = await Order.findById(order._id).populate('products.product');

        // Vaciar el carrito después de completar la orden
        cart.products = [];
        await cart.save();

        res.render('checkout/orderConfirmation', { order: populatedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al procesar el pago');
    }
};

exports.showOrderConfirmation = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        const userId = req.session.user._id;
        const order = await Order.findOne({ user: userId }).sort({ createdAt: -1 }).populate('products.product');

        if (!order) {
            return res.status(404).send('Orden no encontrada');
        }

        res.render('orderConfirmation', { order });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al mostrar la confirmación del pedido');
    }
};



