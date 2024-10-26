import express from 'express';
import sessionController from '../controllers/session.controller.js';
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

//LOGIN
router.post("/login", sessionController.login);
//LOGOUT
router.post("/logout", sessionController.logout);
//SESSION
router.get("/session", authenticate(["funcionario", "psicologa", "admin"]), sessionController.session);

export default router;