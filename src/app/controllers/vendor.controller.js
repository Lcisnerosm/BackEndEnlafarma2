const { vendorStorage }  = require('../models/vendor.model')
const respondError = require('./respondError')

async function getVendor(req, res) {
    try {
    let results = await vendorStorage.getVendor()
        return res
            .status(200)
            .json({
                ok: true,
                data: results
            })
    } catch (error) {
        respondError(res, error)
        return
    }
}

async function getVendorid(req, res) {
    console.log("id : ", req.params.id)
    let id = req.params.id
    try{
        let data = await vendorStorage.getbyId(id)
        return res.status(200).json({
            ok: true,
            data: data
        })
    }catch(err) {
        console.log(err)
    }
}

module.exports = {
    getVendor,
    getVendorid
}