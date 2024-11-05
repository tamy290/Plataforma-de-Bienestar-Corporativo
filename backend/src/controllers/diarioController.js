import Diario from '../models/diario.model.js';

const diarioController = {
    // Obtener la ficha de salud del usuario autenticado
    getDiario: async (req, res) => {
        try {
            const diario = await Diario.findOne({ userId: req.user.id }); // Busca la ficha de salud por el ID del usuario
            if (!diario) {
                return res.status(404).json({ message: 'Diario emocional no encontrado' });
            }
            res.json(diario.anotaciones);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el diario emocional', error });
        }
    },

    // Agregar una nueva anotación
    agregarAnotacion: async (req, res) => {
        const { fechaAnotacion, emociones, comentario } = req.body;

        try {
            // Encuentra el diario del usuario o crea uno nuevo si no existe
            let diario = await Diario.findOne({ userId: req.user.id });
            
            if (!diario) {
                diario = new Diario({
                    userId: req.user.id,
                    anotaciones: [{ fechaAnotacion, emociones, comentario }]
                });
            } else {
                // Agrega la nueva anotación
                diario.anotaciones.push({ fechaAnotacion, emociones, comentario });
            }

            await diario.save();
            res.status(201).json({ message: 'Anotación agregada exitosamente', anotacion: { fechaAnotacion, emociones, comentario } });
        } catch (error) {
            res.status(500).json({ message: 'Error al agregar la anotación al diario emocional', error });
        }
    }
};

export default diarioController;