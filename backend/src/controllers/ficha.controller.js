import Ficha from '../models/ficha.model.js';

const createFicha = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
        const newElement = await Ficha.create(data);
        res.status(201).json( { newElement, message: 'La ficha fue añadida exitosamente' });
        return;
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

export default {
    createFicha
};