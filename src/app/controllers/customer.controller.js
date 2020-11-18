const { customStorage } = require('../models/customer.model')
const respondError = require('./respondError')
const Customer = require('../models/customer')

async function getCustom(req, res) {
    try {
        let results = await customStorage.getCustom()
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

async function getCustomid(req, res) {
    console.log("id : ", req.params.id)
    let id = req.params.id
    try {
        let data = await customStorage.getbyId(id)
        return res.status(200).json({
            ok: true,
            data: data
        })
    } catch (err) {
        respondError(res, error)
        return
    }
}

async function getCustomerbr(req, res) {
    console.log("branch : ", req.params.id)
    let br = req.params.id
    try {
        let data = await customStorage.getbybranch(br)
        return res.status(200).json({
            ok: true,
            data: data
        })
    } catch (err) {
        respondError(res, error)
        return
    }
}

async function getCustomer(req, res) {
    console.log("id : ", req.params.id)
    let id = req.params.id
    try {
        let data = await customStorage.getproductbycustomer(id)
        return res.status(200).json({
            ok: true,
            data: data
        })
    } catch (err) {
        respondError(res, error)
        return
    }
}

async function createCustomer(req, res) {
    let Customerdata = new Customer()
    Customerdata = req.body
    Customerdata.vendors_idvendor = req.user.idvendor

    try {
        let results = await customStorage.createCustomer(Customerdata)
        return res
            .status(201)
            .json({
                ok: true,
                data: results
            })
    }
    catch (error) {
        if(error.code == 1062){
            return res
            .status(409)
            .json({
                ok: false,
                message: "Cliente ya existe",
                data: []
            })
        }
        respondError(res, error)
        return
    }

}



module.exports = {
    getCustom,
    getCustomid,
    getCustomerbr,
    getCustomer,
    createCustomer
}