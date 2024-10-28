import express from 'express';
import fichaController from '../controllers/ficha.controller.js';
import authenticate from '../../config/jwt.config.js';

const router = express.Router();

//crear ficha
router.post("/", authenticate(["admin", "funcionario"]), fichaController.createFicha);

export default router;