const User = require('../models/user');
const Cart = require('../models/cart');
const bcrypt = require('bcrypt');

exports.getRegisterPage = (req, res) => {
    res.render('register');
};


exports.registerUser = async (req, res) => {
    try {
        // Extraer datos del cuerpo del formulario
        const { username, email, password, role } = req.body;

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
            password: hashedPassword,
            role
        });

        // Guardar el nuevo usuario en la base de datos
        await newUser.save();

        // Crear un carrito para el usuario
        const newCart = new Cart({
            user: newUser._id, // Asocia el carrito con el nuevo usuario
            items: [] // Puedes inicializar el carrito con un array vacío de elementos
        });

        // Guardar el carrito en la base de datos
        await newCart.save();

        // Asocia el carrito al usuario
        newUser.cart = newCart._id;
        await newUser.save();


        // Iniciar sesión automáticamente después del registro
        req.session.user = newUser;
        req.session.loggedIn = true;

        // Redireccionar al usuario a la página de inicio
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al registrar el usuario');
    }
};


exports.getLoginPage = (req, res) => {
    // Pasa el estado de autenticación a la plantilla
    res.render('login', { loggedIn: req.session.loggedIn });
};

exports.loginUser = async (req, res) => {
    const { emailOrUsername, password } = req.body;

    try {
        // Busca al usuario por email o nombre de usuario en la base de datos
        const user = await User.findOne({
            $or: [
                { email: emailOrUsername.toLowerCase() }, // Convierte el email a minúsculas
                { username: { $regex: new RegExp("^" + emailOrUsername, "i") } } // Ignora la capitalización del nombre de usuario
            ]
        });

        // Si no se encuentra al usuario, redirecciona al usuario de vuelta a la página de inicio de sesión
        if (!user) {
            return res.redirect('/login');
        }

        // Compara la contraseña ingresada con la contraseña almacenada en la base de datos
        const passwordMatch = await bcrypt.compare(password, user.password);

        // Si las contraseñas no coinciden, redirecciona al usuario de vuelta a la página de inicio de sesión
        if (!passwordMatch) {
            return res.redirect('/login');
        }
        
        // Si las contraseñas coinciden, establece la sesión y redirecciona al usuario a la página principal
        req.session.user = user;
        // Establecer el estado de autenticación en la sesión
        req.session.loggedIn = true;

        // Console.log para comprobar la sesión
        console.log("Sesión después de iniciar sesión:", req.session);

        // Redirige al usuario a la página a la que intentaba acceder antes de iniciar sesión (si existe)
        // De lo contrario, redirige al usuario a la página de inicio
        const redirectTo = req.session.redirectTo || '/';
        delete req.session.redirectTo; // Elimina el registro de la página a la que intentaba acceder

        res.redirect(redirectTo);
    } catch (error) {
        console.error("Error durante el inicio de sesión:", error);
        res.status(500).send('Error interno del servidor');
    }
};





exports.logoutUser = (req, res) => {
    // Destruye la sesión del usuario y redirecciona al usuario a la página de inicio
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error interno del servidor');
        } else {
            res.redirect('/');
        }
    });
};
