const connect = require('../database/database')
const Customer = require('./customer')
const customStorage = {}

customStorage.getCustom = async () => {

    let sql = `select idcustomer, name, address, nit, contact, phone from customers`

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


customStorage.getbyId = async (id) => {
    var sql = `select idcustomer, name, address, nit, contact, phone from customers where idcustomer = ?`
    return new Promise((resolve, reject) => {
        connect.query(sql, [id], (err, rows) => {
            if (err) {
                reject(err)
            }
            if (rows) {
                resolve(rows[0])
            }
        })
    })

}

customStorage.getbybranch = async (br) => {
    var sql = `select name AS name_customer, idcustomer from customers where branch_idbranch = ?`
    return new Promise((resolve, reject) => {
        connect.query(sql, [br], (err, rows) => {
            if (err) {
                reject(err)
            }
            if (rows) {
                resolve(rows)
            }
        })
    })
}

customStorage.getproductbycustomer = async (pr) => {
    var sql = `select da.iddatails as factura, c.name as name_customer, 
    s.date as fecha, da.price, da.quantity, da.total,
     p.name as name_product from datails da
    inner join sales s on da.sales_idsales = s.idsales
    inner join product p on da.product_idproduct = p.idproduct
    left join customers c on s.customer_idcustomer = c.idcustomer
    where c.idcustomer = ?`
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

customStorage.createCustomer = async (customer) => {
    let custo = new Customer()
    custo = customer;
    let sql = `insert into customers (name, address, nit, contact, phone, vendors_idvendor, branch_idbranch) values (?,?,?,?,?,?,?)`

    return new Promise((resolve, reject) => {
        connect.query(sql, [
            custo.name, custo.address, custo.nit, custo.contact, custo.phone, custo.vendors_idvendor, custo.branch_idbranch
        ], (err, rows) => {
            if (err) {
               if(err.errno){
                reject({
                    code: err.errno,
                    error: err
                })
                console.log(rows)   
               }
            }
            resolve(custo)
        })
    })
}


module.exports = { customStorage } 