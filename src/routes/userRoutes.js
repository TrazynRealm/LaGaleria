const express = require('express');
const router = express.Router();
const productController = require('./productController');
const forumController = require('./forumController')

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

router.get('/products', (req, res) => {
    const products = productController.getProductList(); // Cambiar getProductList a través de productController
    res.render('products/index', { products });
});


// GET para mostrar la página de detalle de un producto específico
router.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const product = productController.getProductById(productId); // Corregido aquí
    res.render('products/detail', { product });
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

// Ruta para mostrar la página principal del foro
router.get('/forum', (req, res) => {
    const categories = forumController.getForumCategories(); // Obtén las categorías del foro
    const topics = forumController.getLatestTopics(); // Obtén los últimos temas del foro
    res.render('forum/index', { categories, topics }); // Renderiza la vista y pasa las categorías y los temas como datos
});

router.get('/forum/topic/:topicId', (req, res) => {
    const topicId = req.params.topicId;
    const topic = forumController.getTopicById(topicId); // Corregir aquí
    const responses = forumController.getTopicResponses(topicId);
    res.render('forum/topic', { topic, responses }); // Renderizar la vista y pasar el tema como datos
});



module.exports = router;
