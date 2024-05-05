const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController'); 

router.get('/products', async (req, res) => {
    try {
        const products = await productController.getProductList(); 
        res.render('products/index', { products });
    } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
        res.status(500).send('Error interno del servidor');
    }
});

router.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const product = productController.getProductById(productId);
    res.render('products/detail', { product });
});

module.exports = router;
