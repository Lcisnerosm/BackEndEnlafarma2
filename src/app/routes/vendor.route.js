const route = require('express').Router()
const { AuthAdmin } = require('../middlewares/auth')
const { getVendor, getVendorid } = require('../controllers/vendor.controller')


route.route('/').get(AuthAdmin, getVendor)
route.route('/:id').get(getVendorid)

module.exports = route

