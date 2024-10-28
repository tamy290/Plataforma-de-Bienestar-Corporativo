//IMPORTACIONES
import dotenv from "dotenv";
import express from "express";
import dbConnect from './config/config.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//Importaciones de rutas
import userRoute from './src/routes/user.route.js';
import sessionRoutes from './src/routes/session.route.js';
import fichaRoute from './src/routes/ficha.route.js';

dotenv.config();    
const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cookieParser()); //Configuración de cookies
app.use(cors(
    {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
    }
));


//USO DE RUTAS
app.use("/api/users", userRoute);
app.use("/api/session", sessionRoutes);
app.use("/api/ficha", fichaRoute);

dbConnect();

//servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
