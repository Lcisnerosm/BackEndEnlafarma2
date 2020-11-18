const route = require('express').Router()

const { crearpedido } = require('../controllers/sale.controller')


route.route('/').post(crearpedido)

module.exports = route