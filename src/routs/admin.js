const { Router } = require('express')
const router = Router()
const mongodb = require('mongodb')

const uri = "mongodb+srv://kurivyan:Qqwerty123@cluster0.hflo0.mongodb.net/?retryWrites=true&w=majority"; 
const mongoClient = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: mongodb.ServerApiVersion.v1 });


router.get('/', (req, res) => {
    var pageName = 'adminPage'
    var sessionData = req.session

    mongoClient.connect(async function(error, mongo) {
        let db = mongo.db('mainDataSet')
        let coll = db.collection('users')

        let userlist = await coll.find().toArray()

        res.render('adminPage', {userlist, pageName, sessionData})
    })
})

module.exports = router