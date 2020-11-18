const saleStorage = require('../models/sales.model')
const respondError = require('./respondError')

const salesController = {}

salesController.crearpedido = async (req, res) => {
    let sale = req.body.data
    if (sale.length == 0) {
        return res
            .status(400)
            .json({
                ok: false, message: 'Bad request', data: []
            })
    }
    try {
        let results = await saleStorage.createSale(sale)
        return res
            .status(201)
            .json({
                ok: true,
                data: results
            })
    }
    catch (err) {
        respondError(res, err)
        return
    }
}


module.exports = salesController