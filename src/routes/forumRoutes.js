const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController'); 


router.get('/forum', forumController.getAllPosts);

router.get('/forum/post/:postId', forumController.getPostWithComments);

module.exports = router;