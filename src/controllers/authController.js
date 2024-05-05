const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.getRegisterPage = (req, res) => {
    res.render('register');
};

exports.registerUser = async (req, res) => {
    try {
        // Extraer datos del cuerpo del formulario
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('El usuario ya existe');
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear un nuevo usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Guardar el nuevo usuario en la base de datos
        await newUser.save();

        // Redireccionar al usuario a la página de inicio de sesión u otra página
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al registrar el usuario');
    }
};
