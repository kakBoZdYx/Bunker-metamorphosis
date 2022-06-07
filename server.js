const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { MongoClient } = require('mongodb')

app.use(bodyParser.urlencoded({extended : true}))
app.use(cookieParser({secret : '123'}))

app.get('/', (req, res) => {
    res.write('Hello World')
})

app.listen( 3000, () => {console.log(`Server Started`)})