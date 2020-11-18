const producModel = require('../models/products.model')
const respondError = require('./respondError')

const productController = {}

productController.getProduct = async (req, res) => {
    try {
        let result = await producModel.getproduct()
        return res
            .status(200)
            .json({
                ok: true,
                data: result
            })
    }
    catch (err) {
        respondError(res, err)
        return
    }
}

productController.createProduct = async (req, res) => {
    let name = req.body.name
    if (!name) {
        return res
            .status(400)
            .json({
                ok: false,
                message: 'Bad Request',
                data: []
            })
    }
    try {
        let result = await producModel.createproduct(name)
        return res
            .status(200)
            .json({
                ok: true,
                data: result
            })
    }
    catch (err) {
        respondError(res, err)
        return
    }
}

module.exports = productController