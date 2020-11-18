const bcrypt = require('bcryptjs')
const authService = require('../services/auth.service')
const respondError = require('./respondError')
const jwt = require('../helpers/jwt-token')

const handAuth = {}

handAuth.Login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            ok: false,
            message: 'Email and password not found in the request',
            data: []
        })
    }

    try {
        let results = await authService.get(email)
        bcrypt.compare(password, results.password, async (err, result) => {
            if (!result) {
                return res
                    .status(404)
                    .json({
                        ok: false,
                        message: 'User not found',
                        data: []
                    })
            }

            let token = await jwt.CreateToken(results.idLogin, results.rol, results.idvendor)
            let user = {
                email: results.email,
                token: token,
                rol: results.rol
            }

            return res
                .status(200)
                .json({
                    ok: true,
                    data: user
                })
        });

    } catch (error) {
        if (error.code == 404) {
            return res
                .status(404)
                .json({
                    ok: false,
                    message: 'User not found',
                    data: []
                })
        }

        respondError(res, error)
        return
    }

}

handAuth.create = async (req, res) => {
    console.log(req.iam)
    const { email, password, rol, idvendor } = req.body

    if (!email || !password || !rol || !idvendor) {
        return res.status(400).json({
            ok: false,
            message: 'Email and password not found in the request',
            data: []
        })
    }

    try {
        let results = await authService.create(email, password, rol, idvendor)
        return res
            .status(201)
            .json({
                ok: true,
                data: results
            })
    } catch (error) {
        if (error.code == 1452) {
            return res
                .status(400)
                .json({
                    ok: false,
                    message: "Datos asociados incorrectos",
                    data: []
                })
        }

        if (error.code == 1062){
            return res
                .status(409)
                .json({
                    ok: false,
                    message: "Este usuario ya existe",
                    data: []
                })
        }
        respondError(res, error)
        return
    }
}

module.exports = handAuth