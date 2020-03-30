const express = require('express');
const router = express.Router();

const userCreationController  = require('./../controllers/User/createAccount');
const userLoginController  = require('./../controllers/User/login');
const userMailVerificationController  = require('./../controllers/User/loginMailVerification');

router.post('/v1/users/createAccount',userCreationController.doCreateAccount);
router.post('/v1/users/login',userLoginController.doLogin);
router.get('/v1/users/verify',userMailVerificationController.verifyToken);

module.exports = router;
