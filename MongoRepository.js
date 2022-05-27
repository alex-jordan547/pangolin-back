const mongo = require('mongodb')
const {MongoClient} = require("mongodb");
const Client = mongo.MongoClient
const uri = "mongodb+srv://pangolin:pangolin@cluster0.vieep.mongodb.net/test"
const dbName = 'pangolin'
const MyMongoClient = new MongoClient(uri)

exports.connect = ()=>{
    return new Promise((resolve,reject)=>{
        MyMongoClient.connect((err)=>{
            console.log('Connected successfully to server')
            let  db = MyMongoClient.db(dbName)
            resolve(db);
            if(err)
                reject(err)
        })
    })

}
exports.register=(db,pangolin,callback)=>{
    db.collection('pangolin').insertOne({
        username:pangolin.username,
        password:pangolin.password,
        role:pangolin.role,
    }).then((res)=>callback(res))

}
exports.login=(db,pangolin,callback)=>{

    db.collection('pangolin').findOne({
        username:pangolin.username,
        password:pangolin.password,
    }).then((res)=>callback(res))

}
exports.find=(db,id,callback)=>{
    db.collection('pangolin').findOne({
        _id:id
    }).then((res)=>callback(res))
}
exports.updateRole=(db,id,pangolin,callback)=>{
    db.collection('pangolin').updateOne({
        _id:id},{$set:{
            role:pangolin.role,
        }}
    ).then((res)=>callback(res))
}
exports.addFriend=(db,idPangolin,idFriend,callback)=>{
    db.collection('pangolin').updateOne({
        _id:idPangolin},{$addToSet:{
            amis:idFriend
        }}
    ).then((res)=>callback(res))
}
exports.findAll=(db,callback)=>{

     db.collection('pangolin').find({ }).toArray((err,docs)=>{
            callback(docs)
        })

}
exports.deleteFriend=(db,idPangolin,idFriend,callback)=>{
    db.collection('pangolin').updateOne({
        _id:idPangolin},{$pull:{
            amis:idFriend
        }}



    ).then((res)=>callback(res))
}
