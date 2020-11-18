const route = require('express').Router()

const { getBranch, getBranchid } = require('../controllers/branch.controller')


route.route('/').get(getBranch)
route.route('/:id').get(getBranchid)

module.exports = route

