const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// Ruta para mostrar el formulario de checkout
router.get('/checkout', checkoutController.getCheckout);

// Ruta para procesar el pago
router.post('/checkout/process', checkoutController.processCheckout);

// Ruta para la vista de confirmación de pedido
router.get('/orderConfirmation', checkoutController.showOrderConfirmation);

module.exports = router;
