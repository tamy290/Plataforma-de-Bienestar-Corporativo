// faltaria importacion de models

const create = async (req, res) => {
    try {
        const data = req.body;
        const newElement = await User.create(data);
        res.status(201).json(newElement);
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {  // Clave duplicada
            res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
};

export default {
    create
};