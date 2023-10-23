const express = require('express')

const router = express.Router();
const home_controller = require('../controllers/home_controller')
console.log("Router Loaded")

router.get('/',home_controller.home)
router.use('/users',require('./user'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comment'));
router.use('/api',require('./api'));
module.exports = router;