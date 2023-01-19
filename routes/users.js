const passport = require('passport');   
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const { application } = require('express');

router.get('/profile',passport.checkAuthentication, userController.profile);
router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.post('/create_user', userController.create_user);

// use passport as middleware to authenticate 
router.post('/create_session', passport.authenticate(
    'local',
    {fialureRedirect: '/users/signin'}
), userController.create_session);

router.get('/signout', userController.destroySession);

module.exports = router;    