import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Token ausente' });

    jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
        if (err) return res.status(403).json({ message: 'Token inválido ou expirado' });
        req.usuario = usuario;
        next();
    });
}

export function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.usuario.role)) {
            return res.status(403).json({ message: 'Acesso não autorizado para esta role' });
        }
        next();
    };
}
