const salesModel = require('./src/app/models/sales.model')
const uuid = require('uuid')

async function sales() {
    let sale = [
        {
            sales_idsales: uuid.v4(),
            date: new Date(),
            customer_idcustomer: 1,
            price: 20,
            quantity: 10,
            total: 200,
            product_idproduct: 2
        },
        {
            sales_idsales: uuid.v4(),
            date: new Date(),
            customer_idcustomer: 1,
            price: 20,
            quantity: 10,
            total: 200,
            product_idproduct: 2
        },
        {
            sales_idsales: uuid.v4(),
            date: new Date(),
            customer_idcustomer: 1,
            price: 20,
            quantity: 10,
            total: 200,
            product_idproduct: 2
        }
    ]
    try {
        let result = await salesModel.createSale(sale)
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }

}

sales()




