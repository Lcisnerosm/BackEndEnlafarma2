const recepStorage = require('../models/recep.model')
const respondError = require('./respondError')


async function getRecep(req, res) {
    console.log("id : ", req.params.id)
    let id = req.params.id
    try {
        let data = await recepStorage.getSalebyVendor(req.user.idvendor)
        return res.status(200).json({
            ok: true,
            data: data
        })
    } catch (err) {
        respondError(res, error)
        return
    }
}


module.exports = getRecep