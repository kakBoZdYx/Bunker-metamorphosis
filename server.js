const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongodb = require('mongodb')
const MongoStore = require('connect-mongo')
const path = require('path')
const session = require('express-session')

app.use(bodyParser.urlencoded({extended : true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/src/')))
app.use(session({ 
        secret : ['key', 'secretSid', 'seed'],
        resave : true,
        cookie: { 
                httpOnly: true,
                maxAge: null 
        },
        store : MongoStore.create({ mongoUrl: 'mongodb+srv://kurivyan:Qqwerty123@cluster0.hflo0.mongodb.net/?retryWrites=true&w=majority' })
}))

app.set('view engine', 'ejs')//view engine
app.set('views', path.join(__dirname + "/src/views"))

//MongoDb Connection
const uri = "mongodb+srv://kurivyan:Qqwerty123@cluster0.hflo0.mongodb.net/?retryWrites=true&w=majority"; 
const mongoClient = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongodb.ServerApiVersion.v1 });

//user_rout
const user = require(path.join(__dirname, '/src/routs/user.js'))
app.use('/user', user)
//admin_rout
const admin = require(path.join(__dirname, '/src/routs/admin.js'))
app.use('/admin', admin)

app.get('/', (req, res) => {
        sessionData = req.session
        pageName = 'home'
        res.render('index', {sessionData, pageName})
})

app.listen(process.env.PORT || 3000, () => {console.log(`Server Started`)})