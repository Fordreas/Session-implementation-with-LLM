const express = require('express');
const router = express.Router();

// Import controllers
const AuthController = require('./Controllers/AuthController');
const UserController = require('./Controllers/UserController');

// Import middlewares
const { requireAuth, redirectIfAuth } = require('./Middlewares/auth');
const { validate, registerSchema, loginSchema, updateSchema } = require('./Middlewares/validation');

// Public routes
router.get('/', redirectIfAuth, AuthController.showHome);
router.post('/register', redirectIfAuth, validate(registerSchema), AuthController.register);
router.post('/login', redirectIfAuth, validate(loginSchema), AuthController.login);

// Error route
router.get('/error', UserController.showError);

// Protected routes (require authentication)
router.get('/profile', requireAuth, UserController.showProfile);
router.post('/profile/update', requireAuth, validate(updateSchema), UserController.updateProfile);
router.get('/logout', requireAuth, AuthController.logout);

module.exports = router;
