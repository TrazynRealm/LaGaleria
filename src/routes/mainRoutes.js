const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');
const forumRoutes = require('./forumRoutes');
const userRoutes = require('./userRoutes')
const cartRoutes = require('./cartRoutes')

router.use('/',userRoutes);
router.use(productRoutes);
router.use(forumRoutes);
router.use(cartRoutes);

module.exports = router;