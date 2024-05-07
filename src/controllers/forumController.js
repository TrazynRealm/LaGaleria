const Post = require('../models/post');
const Comment = require('../models/comment');

// Función para obtener todos los posts
exports.getAllPosts = async (req, res) => {
    try {
        console.log("Sesión en getAllPosts:", req.session);
        const posts = await Post.find().populate('author'); // Populamos el campo 'author' para obtener los detalles del autor
        res.render('forum/index', { posts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los posts');
    }
};

// Función para obtener un post y sus comentarios por su ID
exports.getPostWithComments = async (req, res) => {
    try {
        console.log("Sesión en getPostWithComments:", req.session);
        const postId = req.params.postId;
        const post = await Post.findById(postId).populate('author');
        const comments = await Comment.find({ post: postId }).populate('author');
        res.render('forum/post', { post, comments });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener el post y sus comentarios');
    }
};

exports.getCreatePostPage = (req, res) => {
    console.log("Sesión en getCreatePostPage:", req.session);
    res.render('forum/new-post');
};

exports.createPost = async (req, res) => {
    try {
        console.log("Sesión en createPost:", req.session);
        if (!req.session.user || !req.session.user._id) {
            // Manejar caso donde req.session.user o req.session.user._id no están definidos
            console.error("No se pudo obtener el ID del usuario");
            return res.status(400).send('No se pudo obtener el ID del usuario');
        }

        console.log("ID del usuario:", req.session.user._id);

        const { title, content } = req.body;
        const newPost = new Post({
            title,
            content,
            author: req.session.user._id 
        });
        await newPost.save();
        res.redirect('/forum');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el post');
    }
};



exports.addComment = async (req, res) => {
    try {
        console.log("Sesión en addComment:", req.session);
        const postId = req.params.postId;
        const { content } = req.body;
        const newComment = new Comment({
            content,
            author: req.user._id,
            post: postId
        });
        await newComment.save();
        res.redirect(`/forum/post/${postId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al agregar el comentario');
    }
};
