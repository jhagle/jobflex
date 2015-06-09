/**
 * Created by Stephan on 6/8/2015.
 */

//Initialize variables.

var mongoose = require('mongoose');
var db = mongoose.connection;
var configDB = require('../config/database.js');

mongoose.connect(configDB.url, function(){
    /* Drop the DB */
    mongoose.connection.db.dropDatabase();
});

/*Test connection*/

/*
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('Connected');
});
*/
db.close();
