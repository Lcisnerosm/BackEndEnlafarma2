const { branchStorage } = require('../models/branch.model')
const respondError = require('./respondError')

async function getBranch(req, res) { 
    try {
        let results = await branchStorage.getBranch(req.user.id)
        console.log(results)
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

async function getBranchid(req, res) {
    console.log("id : ", req.params.id)
    let id = req.params.id
    try {
        let data = await branchStorage.getbyId(id, req.user.id)
        return res.status(200).json({
            ok: true,
            data: data
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getBranch,
    getBranchid
}