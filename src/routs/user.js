const { Router } = require('express')
const mongodb = require('mongodb')
const router = Router()

const uri = "mongodb+srv://kurivyan:Qqwerty123@cluster0.hflo0.mongodb.net/?retryWrites=true&w=majority"; 
const mongoClient = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongodb.ServerApiVersion.v1 });

router.get('/profile', (req, res) => {
    sessionData = req.session
    pageName = 'Profile'
    res.render('profile', {sessionData, pageName})
})

router.get('/login', (req, res) => {

    sessionData = req.session
    pageName = 'login'
    
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
               
        await coll.insertOne(registrationSchema);
        res.redirect('/')
        })
})
.get('/registration', (req, res) => {

    sessionData = req.session
    pageName = 'registration'

    res.render('registration', {pageName})
})

module.exports = router