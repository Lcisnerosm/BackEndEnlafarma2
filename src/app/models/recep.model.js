const connect = require('../database/database')
const uuid = require('uuid')
const recepStorage = {}

recepStorage.getSalebyVendor = async (pr) => {
    var sql = `select da.iddatails as factura, c.name as name_customer, 
    s.date as fecha, da.price, da.quantity, da.total,
     p.name as name_product from datails da
    inner join sales s on da.sales_idsales = s.idsales
    inner join product p on da.product_idproduct = p.idproduct
    left join customers c on s.customer_idcustomer = c.idcustomer
    where c.vendors_idvendor = ?;`
    return new Promise((resolve, reject) => {
        connect.query(sql, [pr], (err, rows) => {
            if (err) {
                reject(err)
            }
            if (rows) {
                resolve(rows)
            }
        })
    })
}
module.exports = recepStorage