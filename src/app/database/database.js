const mysql = require('mysql')
const { promisify }= require('util')

const data = require('./private.json')

const conection = {
    host: data.mysql.host,
    port: data.mysql.port,
    user: data.mysql.user,
    password: data.mysql.password,
    database: data.mysql.database
}

const bdconnect = mysql.createPool(conection)

bdconnect.getConnection((err, connection) => {
    if (err) {
        if (err.code === errors.ConnectionLost) {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === errors.ManyConnection) {
            console.error('DATABASE HAS TO MANY CONNECTION');
        }
        if (err.code === errors.ConnectionRefused) {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if (connection) connection.release();
    console.log('Conexión satisfactoria a mysql');
    return;
});

bdconnect.query = promisify(bdconnect.query);

module.exports = bdconnect