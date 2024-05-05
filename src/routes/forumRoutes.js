const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController'); 

// Ruta para mostrar la página principal del foro
// router.get('/forum', (req, res) => {
//     const categories = forumController.getForumCategories(); // Obtén las categorías del foro
//     const posts = forumController.getLatestPosts(); // Obtén los últimos temas del foro
//     res.render('forum/index', { categories, posts }); // Renderiza la vista y pasa las categorías y los temas como datos
// });

router.get('/forum', forumController.getAllPosts);

router.get('/forum/post/:postId', (req, res) => {
    const postId = req.params.postId;
    const post = forumController.getPostById(postId); // Corregir aquí
    const comments = forumController.getComments(postId);
    res.render('forum/post', { post, comments }); // Renderizar la vista y pasar el tema como datos
});

module.exports = router;