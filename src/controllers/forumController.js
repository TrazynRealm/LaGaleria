const Post = require('../models/post')
const Comment = require('../models/comment')

// Función para obtener las categorías del foro (simulado, sin base de datos)
function getForumCategories() {
    // Aquí podrías recuperar las categorías desde la base de datos MongoDB en el futuro
    return [
        { id: 1, name: 'Categoría 1', description: 'Descripción de la categoría 1' },
        { id: 2, name: 'Categoría 2', description: 'Descripción de la categoría 2' },
        { id: 3, name: 'Categoría 3', description: 'Descripción de la categoría 3' }
    ];
}

function getLatestPosts() {
    // Aquí podrías recuperar los temas desde la base de datos MongoDB en el futuro
    return [
        { id: 1, title: 'Tema 1', author: 'Autor 1', date: '2024-03-16', content: 'Contenido del tema 1' },
        { id: 2, title: 'Tema 2', author: 'Autor 2', date: '2024-02-15', content: 'Contenido del tema 2' },
        { id: 3, title: 'Tema 3', author: 'Autor 3', date: '2024-01-14', content: 'Contenido del tema 3' }
    ];
}

function getPostById(postId) {
    // Aquí podrías recuperar el tema desde la base de datos MongoDB en el futuro
    // Por ahora, simplemente devolveremos un objeto de tema simulado
    return {
        id: postId,
        title: 'Tema ' + postId,
        author: 'Autor ' + postId,
        date: '2024-03-16',
        content: 'Contenido del tema ' + postId
    };
}

function getComments(postId) {
    // Aquí podrías recuperar las respuestas desde la base de datos MongoDB en el futuro
    // Por ahora, simplemente devolveremos respuestas simuladas para cada tema
    if (postId === 1) {
        return [
            { id: 1, author: 'Autor Respuesta 1', date: '2024-03-17', content: 'Contenido de la respuesta 1' },
            { id: 2, author: 'Autor Respuesta 2', date: '2024-03-18', content: 'Contenido de la respuesta 2' }
        ];
    } else if (postId === 2) {
        return [
            { id: 3, author: 'Autor Respuesta 3', date: '2024-03-19', content: 'Contenido de la respuesta 3' },
            { id: 4, author: 'Autor Respuesta 4', date: '2024-03-20', content: 'Contenido de la respuesta 4' }
        ];
    } else if (postId === 3) {
        return [
            { id: 5, author: 'Autor Respuesta 5', date: '2024-03-21', content: 'Contenido de la respuesta 5' },
            { id: 6, author: 'Autor Respuesta 6', date: '2024-03-22', content: 'Contenido de la respuesta 6' }
        ];
    } else {
        return []; // Devolver un array vacío si el ID del tema no coincide con ninguno de los temas existentes
    }
}

module.exports = {
    getForumCategories,
    getLatestPosts,
    getPostById,
    getComments
};
