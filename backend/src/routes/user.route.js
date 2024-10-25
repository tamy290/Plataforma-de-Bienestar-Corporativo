//importaciones
import express from 'express';
const router = express.Router();
import userController from '../controllers/user.controller.js';

//crear user
router.post("/", userController.create)

export default router;