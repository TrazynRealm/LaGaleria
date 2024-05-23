const Order = require('../models/order');

exports.getOrders = async (req, res) => {
  try {
    console.log(req.session.user._id); // Depuración
    if (!req.session.user._id) {
      return res.status(401).send('Usuario no autenticado');
    }

    const userId = req.session.user._id;
    const orders = await Order.find({ user: userId })
                              .populate('products.product')
                              .sort({ createdAt: -1 }) // Ordenar por fecha de creación en orden descendente
                              .exec();
    res.render('cart/orders', { orders });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los pedidos');
  }
};
