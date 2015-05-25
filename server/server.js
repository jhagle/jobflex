var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser());
app.use(cors());

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/jetbrains');

var Candidate = mongoose.model('Candidate', {name: String});

/*
app.get("/", function (req, res){
    Product.find(function (err, products){
        res.send(products);
    })
})


app.post("/add", function (req, res){
    var name = req.body.name;
    var product = new Product({name: name})
    product.save(function (err) {
        res.send();
    })
})
*/
app.listen(3000);