const mysql = require('mysql')

const data = require('./private.json')

const conection = {
    host: data.mysql.host,
    port: data.mysql.port,
    user: data.mysql.user,
    password: data.mysql.password,
    database: data.mysql.database
}

const bdconnect = mysql.createConnection(conection)

bdconnect.connect((err) => {
    if(err){
        console.log(`An error has occurred, error: ${err}`)
    }else{
        console.log('Database is connect')
    }
})

module.exports = bdconnect