const express = require('express');
const router = express.Router();

// GET para mostrar la página de inicio de sesión en la raíz de la aplicación
router.get('/', (req, res) => {
    res.render('index');
});

// GET para mostrar otra página (por ejemplo, la página de inicio)
router.get('/home', (req, res) => {
    res.render('home');
});

// GET para mostrar la página de productos
router.get('/products', (req, res) => {
    res.render('products/index');
});

// GET para mostrar la página de producto concreto
router.get('/products/product', (req, res) => {
    res.render('products/product');
});
module.exports = router;
