// IMPORTACIONES
import dotenv from "dotenv";
import express from "express";
import dbConnect from './config/config.js';
import cors from 'cors';
import userRoute from "./src/routes/user.route.js";

dotenv.config();    
const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cors(
    {
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
    }
));


//USO DE RUTAS
app.use("/api/users", userRoute);

dbConnect();

//servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
