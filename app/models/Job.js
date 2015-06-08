/**
 * Created by Stephan on 6/6/2015.
 */

var mongoose = require('mongoose');

// define the schema for our company model
var jobSchema = mongoose.Schema({

        companyname: String,
        title: String,
        jobdescription: String,
        city: String,
        state: String,
        datePosted: {type: Date, default: Date.now},
        skills: Array
    }

);

// create the model for users and expose it to our app
var Job = mongoose.model('Job', jobSchema);

module.exports = Job;

