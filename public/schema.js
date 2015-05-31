/**
 * Created by Stephan on 5/25/2015.
 */

//Initialize variables.

    var mongoose = require('mongoose');
    var fs = require('fs');
    var candidateContent = String(fs.readFileSync('./candidateData.json','UTF-8'));
    var companyContent = String(fs.readFileSync('./companyData.json','UTF-8'));
    var jobContent = String(fs.readFileSync('./jobListing.json','UTF-8'));
    var candidateData = JSON.parse(candidateContent);
    var companyData = JSON.parse(companyContent);
    var jobData = JSON.parse(jobContent);
    var candidateLength = candidateData.length;
    var companyLength = companyData.length;
    var jobLength = jobData.length;

//Connect to database. Database 'jobflex' is automatically created if it does not previously exist.

mongoose.connect('mongodb://admin:admin@proximus.modulusmongo.net:27017/uxaz8uZi');

/*Test connection*/

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Connected');
});

//Define schemas. Some aspects may be needed to be added later.
//Schema methods are not yet implemented. Most options are also not set.


var candidateSchema = mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        password : String,
        firstName : String,
        lastName : String,
        birthdate : Date,
        gender : String,
        address : String,
        city : String,
        state : String,
        created : {type: Date, default: Date.now},
        webpage: String,
        pic: Buffer,
        major: String,
        resume: Buffer,
        references: mongoose.Schema.Types.Mixed,
        skillsSort: Array,
        workAttitude: Array

    }
)

var companySchema = mongoose.Schema(
    {
        companyName : {type: String, required: true, unique: true},
        password: String,
        corporateId : Number,
        firstName : String,
        lastName : String,
        address : String,
        city : String,
        state : String,
        email: String,
        created : {type: Date, default: Date.now},
        webpage: String,
        logo: Buffer,
        description: String,
            workAttitude: Array
    }
)

var jobSchema = mongoose.Schema(
    {
        companyName: String,
        title: String,
        jobDescription: String,
        city: String,
        state: String,
        datePosted: {type: Date, default: Date.now},
        skillsSort: Array
    }
)

//Create models. Mongoose automatically pluralizes collection names, so don't be alarmed when you see
//'candidates' or 'companies' if you are using MongoDB shell.

var candidate = mongoose.model('candidate', candidateSchema)
var company = mongoose.model('company', companySchema)
var job = mongoose.model('job', jobSchema)


//Populate candidate collection if there is data in companyData.json


    for (var i = 0; i < candidateLength; i++) {
        var populateCandidate = new candidate(candidateData[i]);
        populateCandidate.save(function (err, data) {
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

