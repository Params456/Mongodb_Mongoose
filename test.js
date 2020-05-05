var express = require("express");
var app = express()
var mongo = require("mongodb").MongoClient
var url = "mongodb://localhost:27017/Params"
var morgan = require("morgan")
var jwt = require("jsonwebtoken");
app.use(express.json())
app.use(morgan("dev"))



app.post("/",(req,res)=>{
  mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true},(err,db)=>{
    if (err) throw err;
    console.log("connected")
    var Db = db.db("Params")
    Db.createCollection("params",(err,result)=>{
        if (err) throw err;
        console.log("Createdcollection")
        res.status(200).json({
            message : "collectionCreted !"
        
        })
        db.close()
    })
  })
})

app.post("/insertOne",(req,res)=>{
    mongo.connect(url,{useNewUrlParser: true,useNewUrlParser:true},(err,db)=>{
        if (err) throw err;
        console.log("Connected")
        var Db = db.db("Params")
        Db.collection("params").insertOne(req.body,(err,result)=>{
            if (err) throw err;
            res.status(200).json({
                message : "Inserted"
            })
        })
    })
})

app.post("/insertMany",(req,res)=>{
    mongo.connect(url,{useNewUrlParser: true,useNewUrlParser:true},(err,db)=>{
        if (err) throw err;
        console.log("Connected")
        var Db = db.db("Params")
        Db.collection("params").insertMany(req.body,(err,result)=>{
            if (err) throw err;
            res.status(200).json({
                message : "Inserted"
            })
        })
    })
})

app.get("/:Name",(Request,Response)=>{
    mongo.connect(url,{useUnifiedTopology:true,useNewUrlParser:true},(err,db)=>{
        if (err) throw err;
        console.log("!!!")
        var Db = db.db("Params")
        var Querry = {name:Request.params.Name}
        Db.collection("params").find(Querry).toArray((err,result)=>{
            if (err) throw err;
            Response.status(200).json({
                message:result
            })
        })
    })
})

app.put("/update/:name",(req,res)=>{
    mongo.connect(url,{useUnifiedTopology:true,useNewUrlParser:true},(err,db)=>{
        if (err) throw err;
        console.log(`Connected`)
        var Db = db.db("Params")
        var name = {name:req.params.name}
        var Update = {$set:{password:"shabid123"}}
        Db.collection("params").updateOne(name,Update,(err,result)=>{
            if (err) throw err;
            res.status(201).json({
                message:"Updated!!"
            })
        })
    })
})

app.delete("/delete/:name",(req,res)=>{
    mongo.connect(url,{useUnifiedTopology:true,useNewUrlParser:true},(err,db)=>{
        if (err) throw err;
        console.log("Connected!")
        var Db = db.db("Params")
        var Querry = {name:req.params.name}
        Db.collection("params").deleteOne(Querry,(err,result)=>{
            if (err) throw err;
            res.status(200).json({
                message:"Deleted "+req.params.name
            })
        })
    })
})

app.post("/jwt",(req,res)=>{
    var user = "thaman"
    jwt.sign(user,"sekretkey",(err,token)=>{
        if (err) throw err;
        res.json({
           token
        })
    })
})

app.use("/",(req,res,next)=>{
    var error = new Error ("Not Found !")
    error.status = 404;
    next(error)
})

app.use("/",(error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        message : error.message
    })
})

const port = 2000;
app.listen(port)
console.log(`Listening ${port}`)