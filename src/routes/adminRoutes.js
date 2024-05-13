const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin', adminController.getAdminPage);

// Rutas para usuarios
router.get('/admin/users', adminController.getAdminUsersPage);
router.get('/admin/users/edit/:id', adminController.getEditUserPage);
router.post('/admin/users/edit/:id', adminController.postEditUser);
router.delete('/admin/users/delete/:id', adminController.deleteUser);

// Rutas para productos
router.get('/admin/products', adminController.getAdminProductsPage);
router.get('/admin/products/edit/:id', adminController.getEditProductPage); // Ruta para obtener la vista de edición de producto
router.post('/admin/products/edit/:id', adminController.postEditProduct); // Ruta para procesar la edición de producto
router.post('/admin/products/add', adminController.postAddProduct); // Ruta para agregar un nuevo producto
router.delete('/admin/products/delete/:id', adminController.deleteProduct); // Ruta para eliminar un producto

module.exports = router;
