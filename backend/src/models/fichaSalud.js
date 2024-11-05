import {model, Schema, Types} from 'mongoose';
import customValidations from '../utils/customValidations.js';

const fichaSaludSchema = new Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    apellido: { 
        type: String, 
        required: true 
    },
    fechaNacimiento: { 
        type: Date, 
        required: true,
        validate: [customValidations.validateYear, 'Ingrese un año válido'] 
    },
    genero: { 
        type: String, 
        required: true 
    },
    domicilio: { 
        type: String, 
        required: true 
    },
    telefono: { 
        type: String, 
        required: true 
    },
    correo: { 
        type: String, 
        required: true,
        validate: [customValidations.validateEmail, "Ingrese un email válido"] 
    },
    contactoEmergencia: { 
        type: String, 
        required: true 
    },
    alergias: { 
        type: String, 
        required: true 
    },
    medicacionActual: { 
        type: String,
        required: true,
        enum: ['Sí', 'No'] 
    },
    medicacionDetalle: { 
        type: String,
        validate: [customValidations.validateMedicacion, "Ingrese el detalle de su medicación"]
    },
    historialEnfermedades: { 
        type: String 
    },
    condicionesPreexistentes: { 
        type: String 
    },
    tipoSangre: { 
        type: String 
    },
    tratamientoPsicologico: { 
        type: String 
    },
    tratamientoDetalle: { 
        type: String 
    },
    userId: { 
        type: Types.ObjectId, 
        ref: 'User', 
        required: true 
    } 
}, {
    timestamps: true // para agregar campos de fecha de creación y actualización automáticamente
});

const FichaSalud = model('FichaSalud', fichaSaludSchema);
export default FichaSalud;

