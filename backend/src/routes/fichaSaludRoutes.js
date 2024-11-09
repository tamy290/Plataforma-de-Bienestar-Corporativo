import express from 'express';
import fichaSaludController from '../controllers/fichaSaludController.js';
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

// para obtener la ficha de salud del usuario autenticado
router.get('/', authenticate(), fichaSaludController.getFichaSalud); // Llama al middleware aquí

// Crear o actualizar la ficha de salud
router.post('/', authenticate(), fichaSaludController.createOrUpdateFichaSalud); // Llama al middleware aquí

export default router;