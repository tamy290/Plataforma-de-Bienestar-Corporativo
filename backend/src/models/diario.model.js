import {model, Schema, Types} from 'mongoose';

const anotacionSchema = new Schema({
    fechaAnotacion: { 
        type: Date, 
        required: true,
    },
    emociones: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
    }
}, {
    timestamps: true // para agregar campos de fecha de creación y actualización automáticamente
});

const diarioSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    anotaciones: [anotacionSchema] // Array de anotaciones
}, {
    timestamps: true // Añade createdAt y updatedAt para el diario en general
});


const Diario = model('Diario', diarioSchema);
export default Diario;
