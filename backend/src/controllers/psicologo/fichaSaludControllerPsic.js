import FichaSalud from './models/fichaSalud.js';

const fichaSaludController = {
    // ficha de salud de un funcionario por su ID
    getFichaSaludByPsicologo: async (req, res) => {
        try {
            const { funcionarioId } = req.params; 

            // Verificar ID válido
            if (!mongoose.Types.ObjectId.isValid(funcionarioId)) {
                return res.status(400).json({ message: 'ID de funcionario no válido' });
            }

            // buscar la ficha de salud del funcionario
            const fichaSalud = await FichaSalud.findOne({ userId: funcionarioId });

            if (!fichaSalud) {
                return res.status(404).json({ message: 'Ficha de salud no encontrada' });
            }

            // para enviar la ficha de salud del funcionario
            res.json(fichaSalud);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la ficha de salud', error });
        }
    },
};

export default fichaSaludController;


// malu soy, cualquier cosa avisenme para cambiar, muy probablemente tenga errores jeje