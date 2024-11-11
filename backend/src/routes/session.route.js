import express from 'express';
import multer from 'multer';
import sessionController from '../controllers/session.controller.js';
import authenticate from '../../config/jwt.config.js';
import { uploadProfilePhoto } from '../controllers/user.controller.js'; // Asegúrate de importar correctamente

// Configuración de multer para la carga de la imagen
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage }).single('foto'); // 'foto' es el campo en el formulario

const router = express.Router();

// login
router.post("/login", sessionController.login);
// logout
router.post("/logout", authenticate(["funcionario", "psicologo", "admin"]), sessionController.logout);
// session
router.get("/session", authenticate(["funcionario", "psicologo", "admin"]), sessionController.session);

// Ruta para subir foto de perfil
router.post('/upload/:userId', authenticate(["funcionario", "psicologo", "admin"]), upload, uploadProfilePhoto);

export default router;
