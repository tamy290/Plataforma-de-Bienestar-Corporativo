import express from 'express';
import sessionController from '../controllers/session.controller.js';
import authenticate from '../../config/jwt.config.js';


const router = express.Router();

//  para iniciar sesión
router.post("/api/login", sessionController.login);

// para cerrar sesión (requiere autenticación)
router.post("/api/logout", authenticate(["funcionario", "psicologo", "admin"]), sessionController.logout);

//  para obtener la sesión actual (requiere autenticación)
router.get("/api/session", authenticate(["funcionario", "psicologo", "admin"]), sessionController.session);

export default router;

