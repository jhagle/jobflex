var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser());
app.use(cors());

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/jetbrains');

var Candidate = mongoose.model('Candidate', {name: String});


app.listen(3000);