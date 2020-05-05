/* Importing Mongodb */

const mongo = require('mongodb').MongoClient;

/* To connect mongodb with Main server */

const url = 'mongodb://localhost:27017/Mydb'

/* Creating Database */

mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, db) => {
   if (err) throw err;
   console.log(`DatabaseCreated!`)
   db.close()
})

/* Create Collection On Database */

mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, res) => {
  if (err) throw err;
  var Db = res.db("Mydb")
  console.log("Connected")
  Db.createCollection("students",(err,result)=>{
      if (err) throw err;
      console.log(`collectionCreated!`)
      res.close()
  })
})

/* Inserting  oneData in Collection */

mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, db) => {
  if (err) throw err;
  var Db = db.db("Mydb")
  console.log("Connected")
  var insert = { name:"Paranthaman",Age:19}
  Db.collection("students").insertOne(insert,(err,res)=>{
      if (err) throw err;
      console.log(`Object Inserted`)
      db.close()
  })
})

/* Inserting manyData In collection */

mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, db) => {
  if (err) throw err;
  var Db = db.db("Mydb")
  console.log("Connected")
  var insert = [{ name:"Biju",Age:19}, { name:"Ajith",Age:19}, { name:"Yogessh",Age:19}, { name:"Kirithiv",Age:20}]
  Db.collection("students").insertMany(insert,(err,res)=>{
      if (err) throw err;
      console.log(`Object Inserted`)
      db.close()
  })
})

/* Getting allData From particular Colllection */

mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, db) => {
  if (err) throw err;
  var Db = db.db("Mydb")
  console.log("Connected")
  Db.collection("students").find({}).toArray((err,res)=>{
      if (err) throw err;
      console.log(res)
      db.close()
  })
})

/* Feteching wholeData From collection Without _Id */

mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, db) => {
  if (err) throw err;
  var Db = db.db("Mydb")
  console.log("Connected")
  Db.collection("students").find({},{ projection: { _id: 0, name: 1, age: 1 } }).toArray((err,res)=>{
      if (err) throw err;
      console.log(res)
      db.close()
  })
})

/* Taking ParticularData with Name */

mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, db) => {
  if (err) throw err;
  var Db = db.db("Mydb")
  console.log("Connected")
  var querry = {name:"Paranthaman"}
  Db.collection("students").find(querry).toArray((err,res)=>{
      if (err) throw err;
      console.log(res)
      db.close()
  })
})

/* Exteacting Data From Collection ThroughThe Name Which is starting By B */

mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, db) => {
  if (err) throw err;
  var Db = db.db("Mydb") 
  console.log("Connected")
  var querry = {name:/^B/}
  Db.collection("students").find(querry).toArray((err,res)=>{
      if (err) throw err;
      console.log(res)
      db.close()
  })
})

/* Sorting the Collection with Accending Order */ 

mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, db) => {
  if (err) throw err;
  var Db = db.db("Mydb")
  console.log("Connected")
  var sort = {name:1}
  Db.collection("students").find().sort(sort).toArray((err,res)=>{
      if (err) throw err;
      console.log(res)
      db.close()
  })
})

/* Delete OneData through Name */

mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true},(err,db)=>{
  if (err) throw err;
  console.log("Connected!")
  var Db = db.db("Mydb")
  var one = {name:"chandhan"}
  Db.collection("students").deleteOne(one,(err,result)=>{
    if (err) throw err;
    console.log(`Deleted${one.name}`)
    db.close()
  })
})

/* Updating Particular Field with name */

mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true}, (err, db) => {
  if (err) throw err;
  var Db = db.db("Mydb")
  console.log("Connected")
  var querry = {name:"Paranthaman"}
  var Update = {$set:{name:"Params",age:18}}
  Db.collection("students").updateOne(querry,Update,(err,res)=>{
      if (err) throw err;
      console.log("Updated")
      db.close()
  })
})

/* Droping Collection */

mongo.connect(url,{useUnifiedTopology: true, useNewUrlParser: true},(err,res)=>{
   if (err) throw err;
   console.log("Connected");
   var Db = res.db("Mydb")
   Db.dropCollection("students",(err,result)=>{
     if (err) throw err;
     if (result) console.log("dropedCollection")
     res.close()
   })
})

