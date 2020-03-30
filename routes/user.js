const express = require('express');
const router = express.Router();
const userController  = require('./../controllers/user');

router.post('/v1/users/createAccount',userController.doCreateAccount);
router.post('/v1/users/login',userController.doLogin);
router.get('/v1/users/verify',userController.verifyToken);

module.exports = router;
