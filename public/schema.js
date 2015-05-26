/**
 * Created by Stephan on 5/25/2015.
 */

//Connect to database. Database 'jobflex' is automatically created if it does not previously exist.

var mongoose = require('mongoose');
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

var example = new candidate({ username: 'exampleuser', password: 'abcdefg', firstName: 'John', lastName: 'Mueller',
    birthdate: 'April 1, 1985',gender : 'M', address: '504 Chamberlain Lane', city: 'Naperville', state: 'IL'})

var example2 = new company({companyName: 'ACME', password: 'widgets2000', corporateId: '1234567890', firstName: 'Hayden',
    lastName: 'Smith', address: '1000 Corporate Drive', city: 'Chicago', state: 'IL', email: 'ACME@email.com'})

//Save information to database. Data should be shown on console.

example.save(function (err, data) {
    if (err) console.log(err);
    else console.log('Saved : ', data );
});

example2.save(function (err, data) {
    if (err) console.log(err);
    else console.log('Saved : ', data );
});
