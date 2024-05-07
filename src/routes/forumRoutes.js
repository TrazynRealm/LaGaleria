const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController'); 

// Middleware para verificar la autenticación del usuario
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("usuario verificado")
        return next();
    }
    console.log("usuario desconectado")
    res.redirect('/login'); // Redirecciona al usuario a la página de inicio de sesión si no está autenticado
};

// Rutas del foro
router.get('/forum', forumController.getAllPosts);
router.get('/forum/post/:postId', forumController.getPostWithComments);

// Ruta para mostrar el formulario de creación de posts
router.get('/forum/new-post', forumController.getCreatePostPage);
router.post('/forum/new-post',forumController.createPost);

// Ruta para agregar un comentario a un post existente
router.post('/forum/post/:postId/add-comment', forumController.addComment);

router.get('/welcome', (req, res) => {
    res.render('welcome/index', { sets, loggedIn: req.isAuthenticated() });
});

module.exports = router;
