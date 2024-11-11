import jwt from 'jsonwebtoken'; 

// Middleware de autenticación
const authenticate = (requiredRoles) => (req, res, next) => {
    const userToken = req.cookies.userToken || req.headers.authorization?.split(' ')[1];

    if (!userToken) {
        return res.status(401).json({
            errors: {
                auth: {
                    message: "¡No autorizado!"
                }
            }
        });
    }

    jwt.verify(userToken, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({
                errors: {
                    auth: {
                        message: "¡No autorizado!"
                    }
                }
            });
        }

        req.user = payload; // Aquí tienes acceso al rol del usuario

        // Verifica si el usuario tiene el rol necesario
        if (requiredRoles && !requiredRoles.includes(req.user.role)) {
            return res.status(403).json({
                errors: {
                    auth: {
                        message: "¡Acceso denegado!"
                    }
                }
            });
        }

        next();
    });
};

export default authenticate;
