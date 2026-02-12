import express from 'express';
const router = express.Router();

// Import controllers
import AuthController from './Controllers/AuthController.js';
import UserController from './Controllers/UserController.js';

// Import middlewares
import { requireAuth, redirectIfAuth } from './Middlewares/auth.js';
import { validate, registerSchema, loginSchema, updateSchema } from './Middlewares/validation.js';

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

export default router;
