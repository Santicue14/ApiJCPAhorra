process.loadEnvFile()
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Usa la misma clave secreta

const authenticateToken = (req, res, next) => {
    // Obtener el token de las cookies
    const token = req.cookies.token;
    if (token == null) return res.sendStatus(401); // Si no hay token, devolver 401

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Si el token no es válido, devolver 403
        req.user = user; // Guardar el usuario decodificado en la solicitud
        next(); // Pasar al siguiente middleware o ruta
    });
};

module.exports = authenticateToken;