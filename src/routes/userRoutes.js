const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 
const profileController = require('../controllers/profileController');


// GET para mostrar la página de inicio de sesión en la raíz de la aplicación
router.get('/', (req, res) => {
    const sets = [
        {
            name: 'Necrons',
            id: 1,
            image: '/img/necron.png',
            description: 'Una antigua raza de guerreros robóticos que se han despertado de su letargo para reclamar la galaxia. Con tecnología avanzada y cuerpos metálicos inmortales, los Necrons son una amenaza formidable.'
        },
        {
            name: 'Space Marines',
            id: 2,
            image: '/img/marine.png',
            description: 'Los defensores élite del Imperio del Hombre, los Space Marines son super soldados genéticamente modificados. Equipados con una armadura poderosa y armamento avanzado, son el escudo y la espada de la humanidad.'
        },
        {
            name: 'Astra Militarum',
            id: 3,
            image: '/img/militarum.png',
            description: 'El vasto ejército del Imperio del Hombre, compuesto por millones de soldados humanos. La Astra Militarum, también conocida como la Guardia Imperial, depende de su número y fuerza bruta para enfrentar las innumerables amenazas a la galaxia.'
        },
        {
            name: "T'au Empire",
            id: 4,
            image: '/img/tau.png',
            description: 'Una raza joven y avanzada tecnológicamente que busca la expansión y el "Bien Supremo". El Imperio T\'au utiliza tácticas de guerra avanzada y alianzas con otras especies para extender su dominio por la galaxia.'
        }
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

// Ruta Perfil
router.get('/profile', profileController.getProfilePage);
router.post('/profile/update', profileController.updateProfile);

module.exports = router;
