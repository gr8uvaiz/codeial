const express = require('express')
const userController = require('../controllers/user_controller');
const passport = require('passport')
const passportLocal = require('../config/passport-local-startegy')
const router = express.Router();

router.get('/profile/:id',passportLocal.checkAuthentication,userController.profile);
router.post('/update/:id',passportLocal.checkAuthentication,userController.update);
router.get('/sign-up',userController.userSignUp);
router.get('/sign-in',userController.userSignIn);
router.post('/create',userController.create);

// router.post('/createSession',userController.createSession); for manual authentication

router.post('/createSession',passport.authenticate(
    'local',
    {failureRedirect: 'sign-in'}
),userController.createSession);

router.get('/sign-out',userController.destroySession);
module.exports = router;
