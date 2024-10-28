import {model, Schema} from 'mongoose';
import customValidations from '../utils/customValidations.js'

const FichaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    fecha_nac: {
        type: Date,
        required: true,
        validate: [customValidations.validateYear]
    },
    genero: {
        type: String,
        enum: ['masculino', 'femenino', 'otro']
    },
    domicilio: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 13
    },
    email: {
        type: String,
        required: true,
        validate: [customValidations.validateEmail, "Ingrese un email válido"]
    },
    tel_emergencia: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 13
    },
    alergias: {
        type: String, 
        required: true,
        trim: true
    },
    medicacion: {
        type: String,
        enum: ['si', 'no'],
        default: 'no'
    },
    historial_enfermedad: {
        type: String, 
        required: true,
        trim: true
    },
    condicion_preexistente: {
        type: String, 
        required: true,
        trim: true
    },
    tipo_sangre: {
        type: String, 
        required: true,
        trim: true
    },
    tratamiento_psico: {
        type: String,
        enum: ['si', 'no'],
        default: 'no'
    }
}, {timestamps: true});


const Ficha = model('Ficha', FichaSchema);
export default Ficha;