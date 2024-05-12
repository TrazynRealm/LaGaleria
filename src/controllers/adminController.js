// adminController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Función para obtener el usuario de la sesión
async function getUserFromSession(req) {
    const userId = req.session.user._id; // Asegúrate de que esto esté correctamente definido en tu sesión
    if (!userId) {
        return null;
    }
    try {
        const user = await User.findById(userId).exec();
        return user;
    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        return null;
    }
}

exports.getAdminPage = async (req, res) => {
    const user = await getUserFromSession(req);
    // Aquí puedes agregar lógica adicional si es necesario, como cargar datos específicos para la vista
    res.render('admin', { user });
};
exports.getAdminUsersPage = async (req, res) => {
    try {
        const users = await User.find({}); // Asegúrate de que estás obteniendo los usuarios correctamente
        res.render('admin/users', { users }); // Pasando la variable 'users' a la vista
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.redirect('/admin');
    }
};
exports.getAdminProductsPage = async (req, res) => {
    const user = await getUserFromSession(req);
    // Aquí puedes agregar lógica adicional si es necesario, como cargar datos específicos para la vista
    res.render('admin/products', { user });
};

exports.getEditUserPage = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        res.render('admin/editUser', { user });
    } catch (error) {
        console.error('Error al obtener el usuario para editar:', error);
        res.redirect('/admin/users');
    }
};

exports.postEditUser = async (req, res) => {
    const userId = req.params.id;
    const { username, email, role } = req.body;
    try {
        await User.findByIdAndUpdate(userId, { username, email, role });
        res.redirect('/admin/users');
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.redirect('/admin/users');
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        await User.findByIdAndDelete(userId);
        res.redirect('/admin/users');
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.redirect('/admin/users');
    }
};