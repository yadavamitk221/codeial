const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');

router.get('/profile', userController.profile);
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.post('/create_user', userController.create_user);
router.post('/create_session', userController.create_session);


module.exports = router;