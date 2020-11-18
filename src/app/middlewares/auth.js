const jwt = require('jwt-simple');
const moment = require('moment');

const { JWT_SECRET } = require('../certificates/jwt-config');
const Middleware = {}

Middleware.Auth = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: 'Unexcpected token in the request',
                    data: []
                })
        }

        var token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res
                .status(401)
                .json({
                    ok: false,
                    message: 'Unexcpected token in the request',
                    data: []
                })
        }

        var payload = jwt.decode(token, JWT_SECRET)
        req.user = {
            id: payload.sub,
            rol: payload.rol,
            idvendor: payload.idvendor
        }

        next();
    } catch (error) {
        if (error.message == 'Token expired') {
            return res
                .status(401)
                .json({
                    ok: false,
                    message: 'Token was expired',
                    data: []
                })
        }

        if (error.message == 'Signature verification failed') {
            return res
                .status(401)
                .json({
                    ok: false,
                    message: 'Signature of the token is invalid',
                    data: []
                })
        }
        return res
            .status(401)
            .json({
                ok: false,
                message: 'The token is invalid',
                data: []
            })

    }

}

Middleware.AuthAdmin = (req, res, next) => {
    let rol = req.user.rol

    if (rol == 'admin') {
        req.iam = 'Soy administrador'
        next()
    } else {
        return res
            .status(401)
            .json({
                ok: false,
                message: "Inautorizado",
                data: []
            })
    }
}

module.exports = Middleware