const express = require('express');
const router = express.Router();
const productRoutes = require('./productRoutes');
const forumRoutes = require('./forumRoutes');
const userRoutes = require('./userRoutes')

router.use('/',userRoutes);
router.use(productRoutes);
router.use(forumRoutes);

module.exports = router;