// adminController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Product = require('../models/product');
const multer = require('multer');
const path = require('path');


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
    try {
        const products = await Product.find({}); // Obtiene todos los productos
        const user = await getUserFromSession(req); // Obtiene el usuario actualmente autenticado
        res.render('admin/products', { products, user }); // Pasa la lista de productos y el usuario a la vista
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.redirect('/admin');
    }
};


exports.getEditUserPage = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await getUserFromSession(req);
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


exports.postAddProduct = async (req, res) => {
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
        console.error('Faltan campos obligatorios para agregar el producto');
        return res.status(400).send('Faltan campos obligatorios para agregar el producto');
    }

    try {
        console.log('Creando nuevo producto:', { name, price, description });
        const newProduct = new Product({ name, price, description });

        if (req.body.image) { // Aquí cambiamos de req.file.path a req.body.image
            newProduct.image = req.body.image;
        }

        await newProduct.save();
        console.log('Producto creado con éxito:', newProduct);
        res.redirect('/admin/products');
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        res.redirect('/admin/products');
    }
};





exports.getEditProductPage = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        res.render('admin/editProduct', { product }); // Renderiza la vista de edición del producto
    } catch (error) {
        console.error('Error al obtener el producto para editar:', error);
        res.redirect('/admin/products');
    }
};

exports.postEditProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, price, image, description } = req.body;
    try {
        await Product.findByIdAndUpdate(productId, { name, price, image, description });
        res.redirect('/admin/products'); // Redirige a la página de productos después de guardar
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.redirect('/admin/products'); // Redirige a la página de productos en caso de error
    }
};

exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        console.log('Intentando eliminar el producto con ID:', productId); // Agregar mensaje de registro
        await Product.findByIdAndDelete(productId);
        console.log('Producto eliminado:', productId); // Agregar mensaje de registro
        res.redirect('/admin/products'); // Redirige a la página de productos después de eliminar
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.redirect('/admin/products'); // Redirige a la página de productos en caso de error
    }
};


 exports.createProduct = async (req, res) => {
     try {
         console.log("Sesión en createProduct:", req.session);
         if (!req.session.user || !req.session.user._id) {
             // Manejar caso donde req.session.user o req.session.user._id no están definidos
             console.error("No se pudo obtener el ID del usuario");
             return res.status(400).send('No se pudo obtener el ID del usuario');
         }

         console.log("ID del usuario:", req.session.user._id);

         const { name, description, price } = req.body;
         const newProduct = new Product({
             name,
             price,
             description,
             owner: req.session.user._id 
         });
         await newProduct.save();
         res.status(201).send(newProduct);
     } catch (error) {
         console.error(error);
         res.status(500).send('Error al crear el producto');
     }
 };

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).send('El producto no existe.');
        res.send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};