import express from 'express';
import fichaController from '../controllers/ficha.controller.js';

const router = express.Router();

//crear ficha
router.post("/", fichaController.createFicha)

export default router;