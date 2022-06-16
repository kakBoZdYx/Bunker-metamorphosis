const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { MongoClient } = require('mongodb')
const MongoStore = require('connect-mongo')
const path = require('path')
const session = require('express-session')

app.use(bodyParser.urlencoded({extended : true}))
app.use(cookieParser({secret : '123'}))
app.use(express.static(path.join(__dirname, '/src/')))

//routs
const user = require(path.join(__dirname, '/src/routs/user.js'))
app.use('/user', user)

app.use( //cookie connect
    session({
        secret : 'secretkey',
        key : 'seed',
        cookie : {
            httpOnly : true,
            maxAge : null
        },
        store: MongoStore.create({mongoUrl : 'mongodb+srv://kurivyan:Qwerty123@cluster0.hflo0.mongodb.net/?'})
    })
)

app.get('/', (req, res) => {
    if(req.session.auth && req.session.auth == true) {
        res.render('index')
    } else if (req.session.auth == false || !req.session.auth) {
        res.render('index', {sessionUser})
    }
})

app.listen(process.env.PORT || 3000, () => {console.log(`Server Started`)})