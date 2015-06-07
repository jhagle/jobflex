// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
        email: String,
        pass: String,
        companyref: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
        local: {
            usertype: String,
            email: String,
            password: String,
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
                attitude: Array,
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





// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// checking if password is valid
userSchema.methods.validCompanyPassword = function(password) {
    return bcrypt.compareSync(password, this.local.compassword);
};

// create the model for users and expose it to our app

var User = mongoose.model('User', userSchema);


module.exports = User;

