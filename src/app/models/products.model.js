const connect = require('../database/database')
const products = {}

products.getproduct = () => {
    let query = `SELECT * FROM product`
    return new Promise((resolve, reject) => {
        connect.query(query, (err, rows)=>{
            if(err){
                reject(err)
            }
            resolve(rows)
        })
    }) 
}

products.createproduct = (name) => {
    let query = `INSERT INTO product (name) VALUES (?)`
    return new Promise((resolve, reject) => {
        connect.query(query, [name], (err, rows)=>{
            if(err){
                reject(err)
            }
            resolve(name)
        })
    }) 
}

module.exports = products