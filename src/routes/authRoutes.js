/**
 * @file authRoutes.js
 * @description Enrutamiento de la API con middleware de validación sintáctica integrado.
 */
import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { validateAuthPayload } from '../middlewares/validator.js';

const router = Router();

// El middleware intercepta la petición 'POST', valida y luego pasa al controlador
router.post('/register', validateAuthPayload, registerUser);
router.post('/login', validateAuthPayload, loginUser);

export default router;