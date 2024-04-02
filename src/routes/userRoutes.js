const express = require('express');
const router = express.Router();

// GET para mostrar la página de inicio de sesión en la raíz de la aplicación
router.get('/', (req, res) => {
    res.render('login');
});

// GET para mostrar otra página (por ejemplo, la página de inicio)
router.get('/home', (req, res) => {
    res.render('home');
});

module.exports = router;
