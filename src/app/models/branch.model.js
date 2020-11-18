const connect = require('../database/database')
const branchStorage = {}

branchStorage.getBranch = async (iduser) => {

    var sql = `
            SELECT b.idbranch, b.name, b.vendors_idvendor FROM branch b
            INNER JOIN vendors v ON v.idvendor = b.vendors_idvendor
            INNER JOIN login l ON l.vendors_idvendor = v.idvendor
            WHERE l.idLogin = ?`

    return new Promise((resolve, reject) => {
        connect.query(sql, [iduser], (err, rows) => {
            if (err) {
                reject(err)
                console.log(rows)
            }
            if (rows) {
                resolve(rows)
            }
        })
    })
}



branchStorage.getbyId = async (idbranch, iduser) => {
    var sql = `
        SELECT b.idbranch, b.name, b.vendors_idvendor FROM branch b
        INNER JOIN vendors v ON v.idvendor = b.vendors_idvendor
        INNER JOIN login l ON l.vendors_idvendor = v.idvendor
        WHERE b.idbranch = ? AND  l.idLogin = ?`

    return new Promise((resolve, reject) => {
        connect.query(sql, [idbranch, iduser], (err, rows) => {
            if (err) {
                reject(err)
            }
            if (rows) {
                resolve(rows[0])
            }
        })
    })

}

module.exports = { branchStorage }