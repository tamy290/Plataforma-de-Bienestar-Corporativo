import express from 'express';
import fichaSaludController from '../controllers/fichaSaludController.js';
import authenticate from '../middleware/jwt.config.js'; // Middleware de autenticación
import validateFichaSaludParams from '../middleware/validateFichaSaludParams.js'; 
const router = express.Router();
// Ruta para  ficha de salud funcionario
router.get(
    '/fichaSalud/:funcionarioId', 
    authenticate(['psicologo']), // Solo psicólogos pueden acceder
    validateFichaSaludParams, //validar el funcionarioId
    fichaSaludController.getFichaSaludByPsicologo // obtener la ficha de salud
);
export default router;


