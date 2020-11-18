const route = require('express').Router()

const { getProduct, createProduct } = require('../controllers/products.controller')


route.route('/').get(getProduct)
route.route('/').post(createProduct)

module.exports = route