const express = require('express');
const router = express.Router();
const userController  = require('./../controllers/user');

router.post('/v1/users/createAccount',userController.createAccount);
router.get('/v1/users/view',userController.view);


module.exports = router;
