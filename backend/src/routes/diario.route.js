import express from 'express';
import diarioController from '../controllers/diarioController.js';
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

// para obtener el diario emocional del usuario autenticado
router.get('/', authenticate(), diarioController.getDiario); 

// Crear o actualizar el diario emocional
router.post('/', authenticate(), diarioController.agregarAnotacion); // Llama al middleware aquí

export default router;
