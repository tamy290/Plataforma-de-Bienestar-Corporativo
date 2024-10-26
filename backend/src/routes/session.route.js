import express from 'express';
import sessionController from '../controllers/session.controller.js';
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

//LOGIN
router.post("/", sessionController.login);
//LOGOUT
router.post("/", sessionController.logout);
//SESSION
router.get("/", authenticate, sessionController.session);

export default router;