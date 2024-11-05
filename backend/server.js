import dotenv from "dotenv";
import express from "express";
import dbConnect from './config/config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './src/routes/user.route.js';
import sessionRoutes from './src/routes/session.route.js';
import fichaSaludRoutes from './src/routes/fichaSaludRoutes.js';
import authenticate from './config/jwt.config.js';

dotenv.config(); // Cargar las variables de entorno
const app = express();
const PORT = process.env.PORT || 3001; 

// Middleware
app.use(express.json()); // para poder analizar cuerpos JSON
app.use(cookieParser()); // Configuración de cookies

// Configuración de CORS
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Permitir ambos orígenes
    credentials: true, // Permitir el uso de cookies
}));

// USO DE RUTAS
app.use("/api/users", userRoute);
app.use("/api/session", sessionRoutes);

// Middleware para la ruta de ficha con autenticación
app.use('/api/ficha', authenticate(['admin', 'funcionario', 'psicologo']), fichaSaludRoutes); // Añadir autenticación aquí

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


