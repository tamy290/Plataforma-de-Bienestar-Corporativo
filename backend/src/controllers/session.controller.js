import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    //Validamos el usuario y la contraseña
    try {
        const { email, contraseña } = req.body;
        console.log(req.body);
        const user = await User.findOne({ email }); //Buscamos el usuario por email
        if (!user) {    //Si no existe el usuario
            res.status(401).json({
                errors: {
                    email: {
                        message: "¡Usuario no encontrado!"
                    }
                }
            });
            return;
        }

        const passwordMatch = await bcrypt.compare(contraseña, user.contraseña); //Comparamos la contraseña que llega con la encriptada
        if (!passwordMatch) {   //Si no coincide
            res.status(401).json({
                errors: {
                    password: {
                        message: "¡Contraseña incorrecta!"
                    }
                }
            });
            return;
        }

        // Generamos el token
        const token = jwt.sign(
            { id: user._id, role: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Definimos la ruta de redirección según el rol del usuario
        let redirectPath;
        switch (user.rol) {
            case 'funcionario':
                redirectPath = '/funcionario/dashboard'; 
                break;
            case 'psicologo':
                redirectPath = '/psicologo/dashboard'; 
                break;
            case 'admin':
                redirectPath = '/';
                break;
            default:
                return res.status(403).json({ message: 'Rol no reconocido' });
        }

        // Enviamos el token en una cookie y en la respuesta JSON
        res.status(200)
            .cookie("userToken", token, { httpOnly: true }) 
            .json({ token, user: { nombre: user.nombre, rol: user.rol }, redirectPath });
        //Generamos el token
        /*const token = jwt.sign({ id: user._id, role: user.rol }, process.env.JWT_SECRET, { expiresIn: "24h" });

        let redirectPath;
        switch (user.rol) {
            case 'funcionario':
                redirectPath = '/funcionario/dashboard'; 
                break;
            case 'psicologo':
                redirectPath = '/psicologo/dashboard'; 
                break;
            case 'admin':
                redirectPath = '/'; //admin
                break;
            default:
                return res.status(403).json({ message: 'Rol no reconocido' });
        }
        res.status(200) 
            .cookie("userToken", token, { httpOnly: true }) //Enviamos el token en una cookie
            .json({ token, user: { nombre: user.nombre, rol: user.rol }, redirectPath});*/   //Enviamos el token en la respuesta

    } catch (error) {
        console.error("Error en el proceso de inicio de sesión:", error);
        res.status(500).json({ message: "Error en el servidor, intenta nuevamente" });
    }

};

const logout = async (req, res) => {
    res.status(200).clearCookie("userToken").json({message: "Sesión cerrada exitosamente"});
};

const session = async (req, res) => {
    res.status(200).json(req.user);
};


export default { login, logout, session };
