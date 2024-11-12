import FichaSalud from '../models/FichaSalud.js';

const fichaSaludController = {
    // Obtener la ficha de salud del usuario autenticado
    getFichaSalud: async (req, res) => {
        try {
            const fichaSalud = await FichaSalud.findOne({ userId: req.user.id }); // Busca la ficha de salud por el ID del usuario
            console.log(fichaSalud);
            if (!fichaSalud) {
                return res.status(404).json({ message: 'Ficha de salud no encontrada' });
            }
            res.json(fichaSalud);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la ficha de salud', error });
        }
    },

    // Crear o actualizar la ficha de salud
    createOrUpdateFichaSalud: async (req, res) => {
        const {
            nombre,
            apellido,
            fechaNacimiento,
            genero,
            domicilio,
            telefono,
            correo,
            contactoEmergencia,
            alergias,
            medicacionActual,
            medicacionDetalle,
            historialEnfermedades,
            condicionesPreexistentes,
            tipoSangre,
            tratamientoPsicologico,
            tratamientoDetalle
        } = req.body;

        try {
            let fichaSalud = await FichaSalud.findOneAndUpdate(
                { userId: req.user.id }, // Busca si ya existe una ficha de salud
                {
                    nombre,
                    apellido,
                    fechaNacimiento,
                    genero,
                    domicilio,
                    telefono,
                    correo,
                    contactoEmergencia,
                    alergias,
                    medicacionActual,
                    medicacionDetalle,
                    historialEnfermedades,
                    condicionesPreexistentes,
                    tipoSangre,
                    tratamientoPsicologico,
                    tratamientoDetalle,
                    userId: req.user.id // Relaciona la ficha de salud con el usuario
                },
                { new: true, upsert: true }
            );
            res.status(fichaSalud.createdAt === fichaSalud.updatedAt ? 201 : 200).json(fichaSalud);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear o actualizar la ficha de salud', error });
        }
    }
};

export default fichaSaludController;
