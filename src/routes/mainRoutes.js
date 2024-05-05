const express = require('express');
const router = express.Router();
// const passport = require('../config/passport-config'); // Importa el middleware de autenticación

const productRoutes = require('./productRoutes');
const forumRoutes = require('./forumRoutes');
const userRoutes = require('./userRoutes')

// Middleware de autenticación aplicado solo a rutas específicas
// router.use('/forum/new-post', passport.authenticate('local'));

router.use('/', userRoutes);
router.use(productRoutes);
router.use(forumRoutes);

module.exports = router;
