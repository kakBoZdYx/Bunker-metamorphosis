const { Router } = require('express')
const mongodb = require('mongodb')
const router = Router()

const uri = "mongodb+srv://kurivyan:Qqwerty123@cluster0.hflo0.mongodb.net/?retryWrites=true&w=majority"; 
const mongoClient = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongodb.ServerApiVersion.v1 });

router.get('/profile', (req, res) => {
    if(req.session.user && req.session.auth == true) { //check if user logged in

        let username = req.session.username

        res.redirect('/user/profile/' + username)

    } else if (!req.session.user) {
        res.redirect('/user/login')
    }
})

router.get('/profile/:username', (req, res) => {
    res.render('profile', {userData})
})
    
router.get('/login', (req, res) => {

    if(req.session.user) {
        res.redirect('/user/profile')
    } else {
        var pageName = 'Логин'
    
        res.render('login', {pageName})
    }
    
})
.post('/login', (req, res) => {

    var loginData = req.body.LOGlogin
    var passwordData = req.body.LOGpassword

    mongoClient.connect(async function(error, mongo) {
        let db = mongo.db('mainDataSet')
        let coll = db.collection('users')

        if(await coll.find({'user' : loginData}).toArray()) {
            if(await coll.find({'user' : loginData}).toArray().password == passwordData) {
                req.session.user = await coll.findOne({'user' : loginData})
                res.redirect('/')
            } 
        }
    })
})

router.post('/registration', (req, res) => {

    var reg_login = req.body.reglogin
    var reg_password = req.body.regpassword

    var registrationSchema = {
        'login' : reg_login,
        'password' : reg_password
    } 

    mongoClient.connect(async function(error, mongo) {
        let db = mongo.db('mainDataSet');
        let coll = db.collection('users');

        if(!(await coll.find({'login' : reg_login}).toArray().login)) {
            await coll.insertOne(registrationSchema)
            res.redirect('/user/registration')
        } else {
            res.redirect('/user/registration')
        }
        })
})
.get('/registration', (req, res) => {

    sessionData = req.session
    pageName = 'registration'

    res.render('registration', {pageName})
})

module.exports = router