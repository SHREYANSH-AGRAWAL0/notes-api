const router = require('express').Router();
const userController = require('../controllers/user_controller');

router.post('/signUp', userController.createUser);
router.post('/signIn', userController.signIn);

module.exports = router; 