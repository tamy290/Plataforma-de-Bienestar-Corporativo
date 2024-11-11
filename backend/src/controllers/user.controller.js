import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { nombre, apellido, email, contraseña, rol } = req.body;

        // Verifica que todos los campos requeridos estén presentes
        if (!nombre || !apellido || !email || !contraseña || !rol) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        // Verifica que el rol esté dentro de los roles permitidos
        const rolesPermitidos = ['funcionario', 'psicologo', 'admin'];
        if (!rolesPermitidos.includes(rol)) {
            return res.status(400).json({ message: 'Rol no permitido' });
        }

        // Encripta la contraseña antes de guardarla
        const saltRounds = 10;
        const contraseñaEncriptada = await bcrypt.hash(contraseña, saltRounds);

        // Crear el usuario
        const newUser = await User.create({
            nombre,
            apellido,
            email,
            contraseña: contraseñaEncriptada, 
            rol,
        });

        // Definir la ruta de redirección según el rol
        let redirectPath = '/';
        if (rol === 'funcionario') {
            redirectPath = '/funcionario/dashboard';
        } else if (rol === 'psicologo') {
            redirectPath = '/psicologo/dashboard';
        } else if (rol === 'admin') {
            redirectPath = '/admin/dashboard';
        }

        // Generar el token JWT
        const token = jwt.sign(
            { userId: newUser._id, rol: newUser.rol },
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

    
        res.status(201).json({
            message: `Bienvenido, ${nombre} ${apellido}`,
            token,
            nombre,
            apellido,
            rol,
            redirectPath
        });

    } catch (error) {
        console.error('Error en registro de usuario:', error); // Log del error para diagnóstico
        if (error.code === 11000) {  // Clave duplicada (email ya registrado)
            res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        } else {
            res.status(500).json({ message: 'Error al registrar el usuario' });
        }
    }
};

export default {
    registerUser,
};

