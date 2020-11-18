const router = require('express').Router()
const {create } = require('../controllers/auth.controller')
const { AuthAdmin } = require('../middlewares/auth')

router.post('/'/* , AuthAdmin */, create)

module.exports = router