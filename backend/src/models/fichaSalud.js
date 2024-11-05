import mongoose from 'mongoose';

const fichaSaludSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    genero: { type: String, required: true },
    domicilio: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true },
    contactoEmergencia: { type: String, required: true },
    alergias: { type: String },
    medicacionActual: { type: String },
    medicacionDetalle: { type: String },
    historialEnfermedades: { type: String },
    condicionesPreexistentes: { type: String },
    tipoSangre: { type: String },
    tratamientoPsicologico: { type: String },
    tratamientoDetalle: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
}, {
    timestamps: true // para agregar campos de fecha de creación y actualización automáticamente
});

const FichaSalud = mongoose.model('FichaSalud', fichaSaludSchema);
export default FichaSalud;

