import mongoose from 'mongoose';

// Middleware para validar el ID del funcionario
const validateFichaSaludParams = (req, res, next) => {
    const { funcionarioId } = req.params;

    // Validar que el ID del funcionario es válido
    if (!mongoose.Types.ObjectId.isValid(funcionarioId)) {
        return res.status(400).json({ message: 'ID de funcionario no válido' });
    }

    next(); // Si el ID es válido, continúa con la ejecución
};

export default validateFichaSaludParams;
