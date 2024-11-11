import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import customValidations from '../utils/customValidations.js';

const UserSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, '¡El email ya existe!'],
        validate: [customValidations.validateEmail, "Ingrese un email válido"]
    },
    contraseña: {
        type: String, 
        required: true
    },
    foto: {
        type: String, 
        default: null  // Aquí se almacena la ruta de la foto
    },
    rol: {
        type: String,
        enum: ['funcionario', 'psicologo', 'admin'],
        default: 'funcionario'
    }
}, {timestamps: true});

// Encriptación de contraseña
UserSchema.pre('save', function (next) {
    if (this.isModified('contraseña')) {
        try {
            const salt = bcrypt.genSaltSync(10); // Genera un "salt"
            const hash = bcrypt.hashSync(this.contraseña, salt); // Mezcla y transforma la contraseña para su versión cifrada 
            this.contraseña = hash; // Reemplaza el valor de la contraseña plana con la cifrada
            next(); 
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

// Función para comparar contraseñas (para el login)
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.contraseña);
};

const User = model('User', UserSchema);
export default User;
