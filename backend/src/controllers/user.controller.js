import User from '../models/user.model.js';

const create = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const newElement = await User.create(data);
        res.status(201).json(newElement);
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {  //Clave duplicada
            res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
};

export default {
    create
};