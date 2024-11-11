import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

// Ruta para registrar un usuario
router.post("/", userController.registerUser); // Asegúrate de usar la función correcta

export default router;
