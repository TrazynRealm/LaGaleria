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

exports.getProfilePage = async (req, res) => {
    const user = await getUserFromSession(req);
    console.log('Usuario: ', user);
    if (!user) {
        return res.redirect('/login'); // Redirigir a login si no hay usuario en sesión
    }

    res.render('profile', { user });
};

exports.updateProfile = async (req, res) => {
    const userId = req.session.user._id; // Asegúrate de que esto esté correctamente definido en tu sesión
    const { email, password } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        if (email) {
            user.email = email;
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        res.redirect('/profile');
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        res.status(500).send('Error interno del servidor');
    }
};
