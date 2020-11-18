const route = require('express').Router()

const { getCustom, getCustomid, getCustomerbr, getCustomer, createCustomer } = require('../controllers/customer.controller')


route.route('/').get(getCustom)
route.route('/:id').get(getCustomid)
route.route('/branch/:id').get(getCustomerbr)
route.route('/sale/:id').get(getCustomer)
route.route('/').post(createCustomer)

module.exports = route
