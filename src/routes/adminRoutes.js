const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); 


router.get('/admin', adminController.getAdminPage);
router.get('/admin/users', adminController.getAdminUsersPage);
router.get('/admin/products', adminController.getAdminProductsPage);
router.get('/admin/users/edit/:id', adminController.getEditUserPage);
router.post('/admin/users/edit/:id', adminController.postEditUser);
router.delete('/admin/users/delete/:id', adminController.deleteUser);
module.exports = router;