import Diario from '../models/diario.model.js';

const diarioController = {
    // Obtener las anotaciones del diario emocional del usuario autenticado
    getDiario: async (req, res) => {
        try {
            const diario = await Diario.findOne({ userId: req.user.id });
            if (!diario) {
                return res.status(404).json({ message: 'Diario emocional no encontrado' });
            }
            res.json(diario.anotaciones);
        } catch (error) {
            console.error('Error al obtener el diario emocional:', error);
            res.status(500).json({ message: 'Error al obtener el diario emocional', error });
        }
    },

    // Agregar una nueva anotación al diario emocional
    agregarAnotacion: async (req, res) => {
        const { fechaAnotacion, emociones, comentario } = req.body;

        try {
            let diario = await Diario.findOne({ userId: req.user.id });

            if (!diario) {
                diario = new Diario({
                    userId: req.user.id,
                    anotaciones: [{ fechaAnotacion, emociones, comentario }]
                });
            } else {
                diario.anotaciones.push({ fechaAnotacion, emociones, comentario });
            }

            await diario.save();
            res.status(201).json({
                message: 'Anotación agregada exitosamente',
                anotacion: { fechaAnotacion, emociones, comentario }
            });
        } catch (error) {
            console.error('Error al agregar la anotación al diario emocional:', error);
            res.status(500).json({ message: 'Error al agregar la anotación al diario emocional', error });
        }
    },

    // Eliminar una anotación del diario emocional
    eliminarAnotacion: async (req, res) => {
        const { anotacionId } = req.params;

        try {
            const diario = await Diario.findOne({ userId: req.user.id });
            if (!diario) {
                return res.status(404).json({ message: 'Diario emocional no encontrado' });
            }

            // Filtra la anotación que quieres eliminar, asegurando que el ID coincida
            diario.anotaciones = diario.anotaciones.filter(anotacion => anotacion._id.toString() !== anotacionId);

            await diario.save();
            res.status(200).json({ message: 'Anotación eliminada exitosamente' });
        } catch (error) {
            console.error('Error al eliminar la anotación del diario emocional:', error);
            res.status(500).json({ message: 'Error al eliminar la anotación del diario emocional', error });
        }
    }
};

export default diarioController;