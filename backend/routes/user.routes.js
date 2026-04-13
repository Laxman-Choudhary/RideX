const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const { authUser } = require('../middleware/auth.middleware');

router.post('/register', [
  body('email').isEmail().withMessage('Invalid Emial'),
  body('fullname.firstname').isLength({ min: 3 }).withMessage("first name must be atleast 3 characters long"),
  body('password').isLength({ min: 6 }).withMessage('password must be at least 6 characters long'),
],userController.registerUser)


router.post('/login', [
  body('email').isEmail().withMessage('invalid email'),
  body('password').isLength({min:6}).withMessage("password should be atleast 6 length long")
],
  userController.loginUser
)

router.get('/profile', authUser, userController.getUserProfile);

router.get('/logout', userController.logoutUser);

module.exports = router;