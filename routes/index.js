const express = require('express');
const router = express.Router();
const homeController = require("../controllers/home_controller");
const { route } = require('./users');

router.get("/", homeController.home);
router.use('/users', require('./users'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));
router.use('/like', require('./likes'));

router.use('/api', require('./api'));


module.exports = router;