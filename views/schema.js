/**
 * Created by Stephan on 5/25/2015.
 */

//Connect to database. Database 'jobflex' is automatically created if it does not previously exist.

    var mongoose = require('mongoose');
    var candidateData = require('./candidateData.json');
    var companyData = require('./companyData.json');


mongoose.connect('mongodb://localhost/jobflex')

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
        username : String,
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
        resume: Buffer,
        references: mongoose.Schema.Types.Mixed,
        skillsSort: Array,
        workAttitude: Array

    }
)

var companySchema = mongoose.Schema(
    {
        companyName : String,
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
        description: String,
        skillsSort: Array,
        workAttitude: Array

    }
)

//Create models. Mongoose automatically pluralizes collection names, so don't be alarmed when you see
//'candidates' or 'companies' if you are using MongoDB shell.

var candidate = mongoose.model('candidate', candidateSchema)
var company = mongoose.model('company', companySchema)

//Populate candidate collection if there is data in companyData.json

if (candidateData.length != undefined || null) {
    for (var i = 0; i < candidate.length - 1; i++) {
        var populateCandidate = new candidate(candidateData[i]);
        populateCandidate.save(function (err, data) {
            if (err) console.log(err);
            else console.log('Saved : ', data);
        });
    };
};

//Populate company collection if there is data in companyData.json

if (companyData.length != undefined || null) {
    for (var i = 0; i < company.length - 1; i++) {
        var populateCompany = new company(companyData[i]);
        populateCompany.save(function (err, data) {
            if (err) console.log(err);
            else console.log('Saved : ', data);
        });
    };
};
