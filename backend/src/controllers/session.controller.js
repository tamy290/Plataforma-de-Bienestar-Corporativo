import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    //Validemos el usuario y la contraseña
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
        //Generamos el token
        const token = jwt.sign({ id: user._id, role: user.rol }, process.env.JWT_SECRET, { expiresIn: "1h" });

        let redirectPath;
        switch (user.rol) {
            case 'funcionario':
                redirectPath = '/dashboard'; //redirige a la página para funcionarios
                break;
            case 'psicologa':
                redirectPath = '/psicologa/dashboard'; //redirige a la página para funcionarios
                break;
            case 'admin':
                redirectPath = '/'; //admin, puede ingresar a donde quiera
                break;
            default:
                return res.status(403).json({ message: 'Rol no reconocido' });
        }

        res.status(200)     //Enviamos el estado 200
            .cookie("userToken", token, { httpOnly: true }) //Enviamos el token en una cookie
            .json({ token, user: { nombre: user.nombre, rol: user.rol }, redirectPath});   //Enviamos el token en la respuesta

    } catch (error) {
        res.status(500).json(error);
    }

};

const logout = async (req, res) => {
    res.status(200).clearCookie("userToken").json({});
};

const session = async (req, res) => {
    res.status(200).json(req.user);
};


export default { login, logout, session };