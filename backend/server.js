import dotenv from "dotenv";
import express from "express";
import dbConnect from './config/config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authenticate from './config/jwt.config.js';
import userRoutes from './src/routes/user.route.js';
import sessionRoutes from './src/routes/session.route.js';
import fichaSaludRoutes from './src/routes/fichaSaludRoutes.js';
import diarioRoutes from './src/routes/diario.route.js';

// Cargar las variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // Para poder analizar cuerpos JSON
app.use(cookieParser()); // Configuración de cookies


app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], 
    credentials: true, 
}));


app.use("/api/users", userRoutes);
app.use("/api/session", sessionRoutes);

app.use('/api/ficha', authenticate(['admin', 'funcionario', 'psicologo']), fichaSaludRoutes);
app.use('/api/diario-emocional', authenticate(['admin', 'funcionario']), diarioRoutes);

// Conexión a la base de datos y manejo de errores
dbConnect()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');

    // Solo iniciar el servidor si la conexión a la base de datos es exitosa
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
