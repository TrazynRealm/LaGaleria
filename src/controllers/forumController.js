const Post = require('../models/post');
const Comment = require('../models/comment');

// Función para obtener todos los posts
exports.getAllPosts = async (req, res) => {
    try {
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
    res.render('forum/new-post');
};

exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Post({
            title,
            content,
            author: req.user._id 
        });
        await newPost.save();
        res.redirect('/forum');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear el post');
    }
};
