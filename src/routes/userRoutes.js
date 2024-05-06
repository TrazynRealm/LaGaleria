const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 


// GET para mostrar la página de inicio de sesión en la raíz de la aplicación
router.get('/', (req, res) => {
    const sets = [
        { name: 'Necrons', id: 1, image: '/img/necron.png' },
        { name: 'Space Marines', id: 2, image: '/img/marine.png' },
        { name: 'Astra Militarum', id: 3, image: '/img/militarum.png' },
        { name: "T'au Empire", id: 4, image: '/img/tau.png' }
    ];

    res.render('index', { sets, loggedIn: req.session.loggedIn });
});


// GET para mostrar la página de inicio con sets
router.get('/welcome', (req, res) => {
    const sets = [
        { name: 'Necrons', id: 1 },
        { name: 'Space Marines', id: 2 },
        { name: 'Astra Militarum', id: 3 },
        { name: "T'au Empire", id: 4 }
    ];

    res.render('welcome/index', { sets, loggedIn: req.isAuthenticated() });
});

// Rutas login
router.get('/login', authController.getLoginPage);
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);

// Rutas register
router.get('/register', authController.getRegisterPage);
router.post('/register', authController.registerUser);

module.exports = router;
