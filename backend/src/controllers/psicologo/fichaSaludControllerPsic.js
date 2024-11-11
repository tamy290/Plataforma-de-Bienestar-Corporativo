import FichaSalud from '../models/fichaSalud.js';
import mongoose from 'mongoose';

const fichaSaludController = {
    // ficha de salud de un funcionario por su ID
    getFichaSaludByPsicologo: async (req, res) => {
        try {
            const { funcionarioId } = req.params; 

            // Verificar ID válido
            if (!mongoose.Types.ObjectId.isValid(funcionarioId)) {
                return res.status(400).json({ message: 'ID de funcionario no válido' });
            }

            // Buscar la ficha de salud del funcionario
            const fichaSalud = await FichaSalud.findOne({ userId: funcionarioId });

            if (!fichaSalud) {
                return res.status(404).json({ message: 'Ficha de salud no encontrada' });
            }

            // Enviar la ficha de salud del funcionario
            res.status(200).json(fichaSalud);
        } catch (error) {
            console.error(error); // Log para debugging
            res.status(500).json({ message: 'Error al obtener la ficha de salud', error: error.message });
        }
    },
};

export default fichaSaludController;
