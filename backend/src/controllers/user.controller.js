import User from '../models/user.model.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configuración de multer para almacenar las imágenes en una carpeta 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        // Verifica si la carpeta 'uploads' existe, si no, la crea
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Define el nombre del archivo con la fecha y el nombre original
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).single('foto'); // 'foto' es el campo del formulario que lleva la imagen

// Controlador para subir la foto de perfil
export const uploadProfilePhoto = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'Error al subir la imagen' });
        }
        if (req.file) {
            res.status(200).json({ message: 'Imagen subida exitosamente', filePath: `/uploads/${req.file.filename}` });
        } else {
            res.status(400).json({ message: 'No se subió ninguna imagen' });
        }
    });
};

// Controlador para crear un nuevo usuario
export const create = async (req, res) => {
    try {
        // Usamos multer para subir la foto antes de procesar los datos del usuario
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'Error al subir la imagen' });
            }

            const data = req.body;
            if (req.file) {
                data.foto = `/uploads/${req.file.filename}`; // Ruta de la imagen subida
            }

            const newElement = await User.create(data);

            // Dependiendo del rol, agregar el path de redirección
            let redirectPath = '/';
            if (newElement.rol === 'funcionario') {
                redirectPath = '/funcionario/dashboard';
            } else if (newElement.rol === 'psicologo') {
                redirectPath = '/psicologo/dashboard';
            } else if (newElement.rol === 'admin') {
                redirectPath = '/admin/dashboard';
            }

            res.status(201).json({ ...newElement, redirectPath }); // Enviar la ruta de redirección
        });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {  // Clave duplicada
            res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
};

// Exportación de las funciones
export default {
    create,
    uploadProfilePhoto
};
