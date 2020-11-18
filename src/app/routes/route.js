const router = require('express').Router()
const branchRoute = require('./branch.route')

router.use('/branchs', require('./branch.route'))
router.use('/vendors', require('./vendor.route'))
router.use('/customers', require('./customer.route'))
router.use('/users', require('./user.route'))
router.use('/sales', require('./sale.route'))
router.use('/products', require('./products.route'))

module.exports = router;