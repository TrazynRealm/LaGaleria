const express = require('express');
const router = express.Router();

// GET para mostrar la página de inicio de sesión en la raíz de la aplicación
router.get('/', (req, res) => {
    const sets = [
        { name: 'Necrons', id: 1 },
        { name: 'Space Marines', id: 2 },
        { name: 'Astra Militarum', id: 3 },
        { name: "T'au Empire", id: 4 }
    ];

    res.render('index', { sets });
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

// GET para mostrar la página de inicio con sets
router.get('/welcome', (req, res) => {
    const sets = [
        { name: 'Necrons', id: 1 },
        { name: 'Space Marines', id: 2 },
        { name: 'Astra Militarum', id: 3 },
        { name: "T'au Empire", id: 4 }
    ];

    res.render('welcome/index', { sets });
});

module.exports = router;
