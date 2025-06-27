// authMiddleware.js
export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        const user = req.session.user;

        if (!user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: 'Acesso negado: permissão insuficiente' });
        }

        next();
    };
}
