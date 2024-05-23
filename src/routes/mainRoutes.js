const express = require('express');
const router = express.Router();
// const passport = require('../config/passport-config'); // Importa el middleware de autenticación

const productRoutes = require('./productRoutes');
const forumRoutes = require('./forumRoutes');
const userRoutes = require('./userRoutes');
const cartRoutes = require('./cartRoutes');
const adminRoutes = require('./adminRoutes');
const checkoutRoutes = require('./checkoutRoutes');
const pdfRoutes = require('./pdfRoutes');

// Middleware de autenticación aplicado solo a rutas específicas
// router.use('/forum/new-post', passport.authenticate('local'));

router.use('/', userRoutes);
router.use(productRoutes);
router.use(forumRoutes);
router.use(cartRoutes);
router.use(adminRoutes);
router.use(checkoutRoutes);
router.use(pdfRoutes);

module.exports = router;
