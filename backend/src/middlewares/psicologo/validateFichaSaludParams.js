import mongoose from 'mongoose';
const validateFichaSaludParams = (req, res, next) => {
    const { funcionarioId } = req.params;
    // Validar que el ID del funcionario válido
    if (!mongoose.Types.ObjectId.isValid(funcionarioId)) {
        return res.status(400).json({ message: 'ID de funcionario no válido' });
    }
    next(); // Si es válido, continúa con la ejecución
};
export default validateFichaSaludParams;


