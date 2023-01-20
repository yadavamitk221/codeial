const express = require('express');
const router = express.Router();
const passport  = require('../config/passport-local');
const commentController = require('../controllers/comments_controller');

router.post('/create', commentController.create);

module.exports = router;