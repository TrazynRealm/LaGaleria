const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const addProductFromDetailController = require('../controllers/addProductFromDetailController');

// Ruta para obtener el carrito del usuario
router.get('/cart', cartController.getCart);

// Ruta para agregar un producto al carrito
router.post('/cart/add', cartController.addToCart);

// Ruta para agregar un producto al carrito desde detail.ejs
router.post('/cart/addFromDetail', addProductFromDetailController.addToCartFromDetail);

// Ruta para eliminar un producto del carrito
router.post('/cart/remove', cartController.removeFromCart);

// Ruta para actualizar la cantidad de un producto en el carrito
router.post('/cart/update', cartController.updateCartItemQuantity);

module.exports = router;
