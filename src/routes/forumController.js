// Función para obtener las categorías del foro (simulado, sin base de datos)
function getForumCategories() {
    // Aquí podrías recuperar las categorías desde la base de datos MongoDB en el futuro
    return [
        { id: 1, name: 'Categoría 1', description: 'Descripción de la categoría 1' },
        { id: 2, name: 'Categoría 2', description: 'Descripción de la categoría 2' },
        { id: 3, name: 'Categoría 3', description: 'Descripción de la categoría 3' }
    ];
}

function getLatestTopics() {
    // Aquí podrías recuperar los temas desde la base de datos MongoDB en el futuro
    return [
        { id: 1, title: 'Tema 1', author: 'Autor 1', date: '2024-03-16' },
        { id: 2, title: 'Tema 2', author: 'Autor 2', date: '2024-02-15' },
        { id: 3, title: 'Tema 3', author: 'Autor 3', date: '2024-01-14' }
    ];
}

module.exports = {
    getForumCategories,
    getLatestTopics
};