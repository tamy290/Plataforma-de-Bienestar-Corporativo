import dotenv from "dotenv";
import express from "express";
import dbConnect from './config/config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authenticate from './config/jwt.config.js';
import multer from 'multer';  
import userRoutes from './src/routes/user.route.js';
import sessionRoutes from './src/routes/session.route.js';
import fichaSaludRoutes from './src/routes/fichaSaludRoutes.js';
import diarioRoutes from './src/routes/diario.route.js';
import { uploadProfilePhoto } from './src/controllers/user.controller.js'; 

dotenv.config(); // Cargar las variables de entorno

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define el directorio donde se almacenarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname); // Usar el timestamp como parte del nombre del archivo
    }
});

const upload = multer({ storage }).single('foto'); // 'foto' es el campo del formulario de la foto de perfil

// Middleware
app.use(express.json()); // Para analizar cuerpos JSON
app.use(cookieParser()); // Configuración de cookies

// Configuración de CORS
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Permitir ambos orígenes
    credentials: true, // Permitir el uso de cookies
}));

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/session", sessionRoutes);

// Middleware para la ruta de ficha con autenticación
app.use('/api/ficha', authenticate(['admin', 'funcionario', 'psicologo']), fichaSaludRoutes);
app.use('/api/diario-emocional', authenticate(['admin', 'funcionario']), diarioRoutes);

// Ruta para subir foto de perfil
app.post('/api/users/upload/:userId', authenticate(['funcionario', 'psicologo', 'admin']), upload, uploadProfilePhoto);

// Conexión a la base de datos
dbConnect();

// Impresión de rutas
app._router.stack.forEach((route) => {
    if (route.route) {
        console.log(`${route.route.stack[0].method.toUpperCase()} ${route.route.path}`);
    }
});

// Manejo de errores en caso de que las rutas no existan
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack); // Muestra el stack de errores en la consola
    res.status(500).json({ message: 'Ocurrió un error en el servidor', error: err.message });
});

// Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
