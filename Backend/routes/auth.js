const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { validateRegisterUser, validateLoginUser, validationResultHandler } = require('../validators/userValidator');

// Register a new user
router.post('/register', validateRegisterUser, validationResultHandler, registerUser);

// Log in a user
router.post('/login', validateLoginUser, validationResultHandler, loginUser);

module.exports = router;
