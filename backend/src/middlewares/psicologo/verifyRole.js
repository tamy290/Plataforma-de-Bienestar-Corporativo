const verifyRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json( { message: 'Acceso denegado: no tiene el rol necesario' });
        }
        next();
    };
};

export default verifyRole;