import jwt from 'jsonwebtoken';

// Generar JWT
const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
};

// Validar JWT
const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
};

export { generarJWT, validarJWT };
