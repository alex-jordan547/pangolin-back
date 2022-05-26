const express = require('express')
const app = express()
const database = require('./MongoRepository')
var db;
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Connexion à la bdd
database.connect().then(datab=>{
    console.log('connected')
    db = datab;
})

//Routes





app.listen(5000)