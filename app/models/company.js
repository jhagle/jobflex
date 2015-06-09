// app/models/company.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our company model
var companySchema = mongoose.Schema({


    companyemail : String,
    password     : String,
    companyname  : String,
    description  : String,
    culture : { type : Array , "default" : [] },
    skills : { type : Array , "default" : [] }

});

// methods ======================
// generating a hash
companySchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
companySchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
var Company = mongoose.model('Company', companySchema);

module.exports = Company;
