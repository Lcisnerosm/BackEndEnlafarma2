const app = require('./app/app')
var cors = require('cors')

require('./app/database/database')


app.listen(app.get('port'), (error) => {
    if(error){
        console.log(`Internal error ${error}`)
    }else{
        console.log(`Listen and serve on port: ${app.get('port')}`)
    }
}) 


