const connect = require('../database/database')
const uuid = require('uuid')
const saleStorage = {}

saleStorage.createSale = async (ventas) => {
    return new Promise((resolve, reject) => {
        connect.getConnection((error, connection) => {
            if(error){
                reject(error);
            }
            connection.beginTransaction(err => {
                if (err) { reject(err);; }
                ventas.forEach(sales => {
                    let idSale = uuid.v4()
                    let date = new Date()
                    console.log(sales.customer_idcustomer, sales.sales_idsales)
                    //Insert a tabla Sales
                    connection.query('INSERT INTO sales (idsales, date, customer_idcustomer) VALUES (?,?,?)', [idSale, date, sales.customer_idcustomer], (error, results, fields) => {
                        if (error) {
                            return connection.rollback(() => {
                                reject(error);
                            });
                        }
                    });
                    ///Insert a tabla datails
                    connection.query('INSERT INTO datails (price, quantity, total, sales_idsales, product_idproduct) values (?,?,?,?,?);', [sales.price, sales.quantity, sales.total, idSale, sales.product_idproduct], (error, results, fields) => {
                        if (error) {
                            return connection.rollback(() => {
                                reject(error);
                            });
                        }
    
                    });
    
                });
    
                //Hacer el commit de la consulta
                connection.commit(err => {
                    if (err) {
                        return connection.rollback(() => {
                            reject(err);
                        });
                    }
                    resolve(ventas)
                })
            })
        })
        
    })
}
module.exports = saleStorage