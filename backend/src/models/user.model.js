import {model, Schema} from 'mongoose';
import bcrypt from 'bcrypt'

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
        unique: [true, '¡El email ya existe!']
    },
    contraseña: {
        type: String, 
        required: true
    },
    rol: {
        type: String,
        enum: ['funcionario', 'psicologa', 'admin'],
        default: 'funcionario'
    }
}, {timestamps: true});

//Encriptación de contraseña
UserSchema.pre('save', function (next){
    if (this.isModified('contraseña')) {
        try {
            const salt = bcrypt.genSaltSync(10); //genera un "salt"
            const hash = bcrypt.hashSync(this.contraseña, salt); //mezcla y transforma la contraseña para su versión cifrada 
            this.contraseña = hash; //reemplaza el valor de la contraseña plana a la cifrada
            next(); 
        } catch (error) {
            next(error);
        }
    } else{
        next();
    }
});


const User = model('User', UserSchema);
export default User;