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
    var sql = `select ve.name as name_vendor, br.name as name_branch, cu.idcustomer, cu.name as name_customer
                from vendors ve
                inner join branch br on br.idbranch = ve.idvendor
                inner join customers cu on cu.branch_idbranch = br.idbranch
                where br.idbranch = ?`
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
    var sql = `select sa.idsales as factura, sa.date, pr.name,de.price, de.quantity, de.total
                from sales sa
                inner join datails de on de.iddatails = sa.idsales
                inner join product pr on pr.idproduct = de.product_idproduct
                inner join customers cu on cu.idcustomer = sa.customer_idcustomer
                where cu.idcustomer = ?;`
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