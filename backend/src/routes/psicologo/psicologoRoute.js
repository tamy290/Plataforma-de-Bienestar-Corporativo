import express from 'express';
import fichaSaludController from '../controllers/fichaSaludController.js';
import authenticate from '../middleware/jwt.config.js'; // Middleware de autenticación
import validateFichaSaludParams from '../middleware/validateFichaSaludParams.js'; // Middleware de validación de ID
import verifyRole from '../middleware/verifyRole.js'; // Middleware de verificación de rol

const router = express.Router();

// Ruta para obtener la ficha de salud de un funcionario
router.get(
    '/fichaSalud/:funcionarioId', 
    authenticate(['psicologo']), // Solo psicólogos pueden acceder
    verifyRole('psicologo'), // Verificar que el usuario tiene el rol de psicólogo
    validateFichaSaludParams, // Validar el funcionarioId
    fichaSaludController.getFichaSaludByPsicologo // Controlador para obtener la ficha de salud
);

export default router;

