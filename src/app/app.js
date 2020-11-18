const express = require('express')
const { Auth } = require('./middlewares/auth')
const cors = require('cors')
var timeout = require('connect-timeout'); 

const port = (process.env.PORT || 4002)

const app = express()
app.use(timeout(150000));

app.set('port', port)
app.use(cors())

app. use(express.urlencoded({extended: false}))
app.use(express.json())


app.use('/api', Auth, require('./routes/route'))
app.use(require('./routes/free.route'))

module.exports = app