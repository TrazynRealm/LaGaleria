const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', async (req, res) => {
    try {
        const products = await productController.getProductList();
        res.render('products/index', { products, notification: req.session.notification });
        // Limpia la notificación después de que se muestre
        req.session.notification = null;
    } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await productController.getProductById(productId);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('products/detail', { product, notification: req.session.notification });
    } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
        res.status(500).send('Error al obtener los detalles del producto');
    }
});

module.exports = router;
