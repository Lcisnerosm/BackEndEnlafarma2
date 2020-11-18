const connect = require('../database/database')

const vendorStorage = {}

vendorStorage.getVendor = async () => {

    let sql = `select idvendor, name from vendors`

    return new Promise((resolve, reject) => {
        connect.query(sql, (err, rows) => {
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

vendorStorage.getbyId = async (id) => {
var sql = `select idvendor, name from vendors where idvendor = ?`
    return new Promise((resolve, reject) => {
        connect.query(sql, [id], (err, rows) => {
            if(err) {
                reject(err)
            }
            if(rows){
                resolve(rows[0])
            }
        }) 
    }) 

}

module.exports = { vendorStorage } 