// app/models/company.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var companySchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        firstname    : String,
        lastname     : String,
        location     : String,
        culture : { type : Array , "default" : [] },
        skills : { type : Array , "default" : [] }
    }

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
module.exports = mongoose.model('Company', companySchema);