const express = require('express')
const app = express()
const database = require('./MongoRepository')
const {ObjectId} = require("mongodb");
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
    db = datab;

})

//Routes

app.post('/register',function(req,res,next){
    try{
        let pangolin=req.body
        database.register(db,pangolin,(result)=>{
            if(result){
                res.status(200)
                res.json({statut:200,message:'ok',data:result})
                next()
            }
            else{
                res.status(400).json({error:'ko'})
                next()
            }

        })
    }catch(err){
        next(err)
    }


})
app.post('/login',function(req,res,next){
    try{
        let pangolin=req.body
        database.login(db,pangolin,(result)=>{
            if(result){

                res.status(200)
                res.json({statut:200,data:result})
                next()
            }
            else{

                res.status(400).json({error:'ko'})
                next()
            }
        })
    }catch(err){
        next(err)
    }
})
app.get('/Pangolin/:id',function(req,res,next){
    try{
        console.log(req.params.id)
        database.find(db,ObjectId(""+req.params.id+""),(data)=>{
            res.status(200)
            res.json(data)
            next()
        })
    }catch(err){
        next(err)
    }

})
app.put('/update/:id',function(req,res){
    database.updateRole(db,ObjectId(""+req.params.id+""),req.body,(data)=>{
        res.status(200)
        res.json(data)
    })
})
app.put('/deleteFriend/:id',function(req,res){
    database.deleteFriend(db,ObjectId(""+req.params.id+""),ObjectId(""+req.body.id+""),(data)=>{
        res.status(200)
        res.json(data)
    })
})
app.put('/addFriend/:id',function(req,res){
    database.addFriend(db,ObjectId(""+req.params.id+""),ObjectId(""+req.body.id+""),(data)=>{
        res.status(200)
        res.json(data)
    })
})


app.get('/allFriends',(req,res) =>{
    database.findAll(db,(data)=>{
        res.status(200)
        res.json(data)
    })

})


app.listen(5000)