const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();

router.get('/login', userController.screenLogin);
router.get('/register', userController.screenRegister);


router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router;