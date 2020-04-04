const express = require('express');
const router = express.Router();

const userCreationController  = require('./../controllers/User/createAccount');
const userLoginController  = require('./../controllers/User/login');
const userMailVerificationController  = require('./../controllers/User/loginMailVerification');
const userForgotPasswordController = require('./../controllers/User/forgotPassword')
const jwtAuth =require('../middleware/jwtAuth')

router.post('/v1/users/createAccount',userCreationController.doCreateAccount);
router.post('/v1/users/login',userLoginController.doLogin);
router.get('/v1/users/verify',userMailVerificationController.verifyToken);
router.post('/v1/users/forgotPassword',userForgotPasswordController.doForgotPassword);
router.get('/v1/users/reset',userForgotPasswordController.renderResetPassword);
router.post('/v1/users/resetPassword',userForgotPasswordController.resetPassword);
router.post('/v1/users/enableTwoFactorAuth',jwtAuth.checkToken,userLoginController.doEnableTwoFactorAuth);
router.post('/v1/users/disableTwoFactorAuth',jwtAuth.checkToken,userLoginController.doDisableTwoFactorAuth);
router.post('/v1/users/verifyTwoFactorAuth',jwtAuth.checkToken,userLoginController.doVerifyTwoFactorAuth);

module.exports = router;
