const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const cors = require('cors')
const routes = require('./routes')
//const session=require("express-session")
const app = express()
app.set('port', process.env.PORT || 9000)
const dbOptions = {
    host: '147.135.71.233',
    port: 3306,
    user: 'servinar_ozeretski',
    password: ']XNuYQ;66wum',
    database: 'servinar_ozeretski'
}

// middlewares -------------------------------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())

// routes -------------------------------------------
app.get('/', (req, res)=>{
    res.send('Welcome to my API')
})
app.use('/api', routes)

// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})
