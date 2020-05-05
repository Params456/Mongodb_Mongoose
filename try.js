var app = require("express")();
var mongoose = require("mongoose");
var book = require("./mongoose")
var bodyParser = require('body-parser');
var db = {useNewUrlParser: true,useUnifiedTopology: true}
mongoose.connect('mongodb://localhost/test',db);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))

app.get("/",(req,res)=>res.send("I am paranthaman"))

app.get("/book",(req,res)=>{
    console.log("I am getting In")
    book.find({})
    .exec((err,book)=>{
        if(err)console.log("I got err")
        res.json({
            Books : book
        })
    })
})


app.get("/book/:id",(req,res)=>{
    console.log("I am In")
    book.findOne({_id:req.params.id})
    .exec((err,book)=>{
        if (err) console.log(err)
        res.json({Book : book})
    })
})

app.post("/post",(req,res)=>{
    var newBook = new book();
    newBook.title = req.body.title,
    newBook.author = req.body.author

    newBook.save((err,result)=>{
        if (err) res.send("Error Occured");
        res.send(result)
    })
})

app.post("/books", (req, res) => {
    book.create(req.body).then((err, book) => {
        if (err) console.log(err)
        res.send("Inserted")
    })
})

app.put("/put/:id",(req,res)=>{
    book.findOneAndUpdate({_id : req.params.id}, { $set: { title: req.body.title }},{useFindAndModify: false}, (err, book) => {
        if (err) console.log (err);
        res.send(book);
      });
})

app.delete("/delete/:title",(req,res)=>{
    book.findOneAndRemove({title:req.params.title},{useFindAndModify: false},(err,book)=>{
        if (err) console.log("err")
        res.send("Removed")
    })
})


var port = 2000;
app.listen(port,()=>console.log(`Server Started at ${port}`));
