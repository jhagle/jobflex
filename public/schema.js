/**
 * Created by Stephan on 5/25/2015.
 */

//Initialize variables.

var mongoose = require('mongoose');
var fs = require('fs');
var bcrypt   = require('bcrypt-nodejs');
var configDB = require('../config/database.js');

var userContent = String(fs.readFileSync('./candidateData.json','UTF-8'));
var companyContent = String(fs.readFileSync('./companyData.json','UTF-8'));
var jobContent = String(fs.readFileSync('./jobListing.json','UTF-8'));
var userData = JSON.parse(userContent);
var companyData = JSON.parse(companyContent);
var jobData = JSON.parse(jobContent);
var userLength = userData.length;
var companyLength = companyData.length;
var jobLength = jobData.length;

//Connect to database.

mongoose.connect(configDB.url);

/*Test connection*/

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Connected');
});

//Define schemas. Some aspects may be needed to be added later.
//Schema methods are not yet implemented. Most options are also not set.


var userSchema = mongoose.Schema({
        local: {
            usertype: String,
            email: String,
            password: String,
            companyref: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
            candidate: {
                firstname: String,
                lastname: String,
                birthdate: Date,
                school: String,
                major: String,
                culture: {type: Array, "default": []},
                skills: {type: Array, "default": []},
                created: {type: Date, default: Date.now},
                joblist: {type: Array, "default": []}
            },
            companyname: String,
            compassword: String,
            company: {
                firstname: String,
                lastname: String,
                address: String,
                city: String,
                state: String,
                email: String,
                webpage: String,
                description: String,
                culture: Array,
                created: {type: Date, default: Date.now},
                jobs: {
                    title: String,
                    jobdescription: String,
                    city: String,
                    state: String,
                    posted: {type: Date, default: Date.now},
                    skills: Array
                }
            }

        },
        facebook: {
            id: String,
            token: String,
            email: String,
            name: String
        },
        linkedin         : {
            id           : String,
            token        : String,
            email        : String,
            name         : String
        }

    }

)

var companySchema = mongoose.Schema({


    companyname : String,
    _creator :  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    password: String,
    corporateId : Number,
    firstname : String,
    lastname : String,
    address : String,
    city : String,
    state : String,
    email: String,
    created : {type: Date, default: Date.now},
    webpage: String,
    logo: Buffer,
    description: String,
    culture: Array


})

var jobSchema = mongoose.Schema(
    {
        companyname: String,
        title: String,
        jobdescription: String,
        city: String,
        state: String,
        datePosted: {type: Date, default: Date.now},
        skills: Array
    }
)


//Create models. Mongoose automatically pluralizes collection names, so don't be alarmed when you see
//'candidates' or 'companies' if you are using MongoDB shell.

var user = mongoose.model('user', userSchema)
var company = mongoose.model('company', companySchema)
var job = mongoose.model('job', jobSchema)


userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    //if (!user.isModified('local.password')) {return next();};
    //if (!user.isModified('local.compassword')) {return next();};

    // generate a salt
    bcrypt.genSalt(8, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.local.password, salt, null, function(err, hash) {
            if (err) {return next(err);}

            // override the cleartext password with the hashed one
            user.local.password = hash;
        });

        bcrypt.hash(user.local.compassword, salt, null, function(err, hash) {
            if (err) {return next(err);}

            // override the cleartext password with the hashed one
            user.local.compassword = hash;
            next();
        });
    });

});

companySchema.pre('save', function(next) {
    var company = this;



    // only hash the password if it has been modified (or is new)
    if (!company.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(8, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(company.password, salt, null, function(err, hash) {
            if (err) {return next(err);}

            // override the cleartext password with the hashed one
            company.password = hash;
            next();
        });
    });
});



//Populate candidate collection if there is data in companyData.json


for (var i = 0; i < userLength; i++) {
    var populateUser = new user(userData[i]);
    populateUser.save(function (err, data) {
        if (err) console.log(err);
        else console.log('Saved : ', data);
    });
};


//Populate company collection if there is data in companyData.json


for (var i = 0; i < companyLength; i++) {
    var populateCompany = new company(companyData[i]);
    populateCompany.save(function (err, data) {
        if (err) console.log(err);
        else console.log('Saved : ', data);
    });
};

for (var i = 0; i < jobLength; i++) {
    var populateJob = new job(jobData[i]);
    populateJob.save(function (err, data) {
        if (err) console.log(err);
        else console.log('Saved : ', data);
    });
};

