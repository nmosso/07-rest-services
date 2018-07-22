//Verificar tokens
/**
 * Client ID
Client ID
918923516281-290vp0oe7e9f13vap86pu8nr5qusurkf.apps.googleusercontent.com
Client Secret
I7Ooe-OiEbIodVaVdpwxsp9Y
 */

const jwt = require('jsonwebtoken');

let verificarToken = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

let verificarAdminRole = (req, res, next) => {

    let usuario = req.usuario;
    if (usuario.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: { message: 'No tiene permiso para realizar esta tarea' }
        });
    }
    next();
};

module.exports = {
    verificarToken,
    verificarAdminRole
}