// config/passport.js
//commit...

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

// load up the user model
var User = require('../app/models/user');
var Company = require('../app/models/company');

// load the auth variables
var configAuth = require('./auth');


// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });

    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email': email }, function (err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {

                    // if there is no user with that email
                    // create the user
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password); // use the generateHash function in our user model
                    newUser.local.candidate.firstname = req.param('firstname');
                    newUser.local.candidate.lastname = req.param('lastname');
                    newUser.local.candidate.birthdate = req.param('birthdate');
                    newUser.local.candidate.school = req.param('school');
                    newUser.local.candidate.major = req.param('major');
                    newUser.local.candidate.created = req.param('created');


                    // save the user
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }

            });


        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email': email }, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            });


        }));

    // =========================================================================
    // FACEBOOK AUTHENTICATION==================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID        : configAuth.facebookAuth.clientID,
            clientSecret    : configAuth.facebookAuth.clientSecret,
            callbackURL     : configAuth.facebookAuth.callbackURL

        },

        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {

                // find the user in the database based on their facebook id
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser            = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.id    = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));

    // =========================================================================
    // LINKEDIN AUTHENTICATION==================================================
    // =========================================================================
    passport.use(new LinkedInStrategy({

            clientID        : configAuth.linkedinAuth.clientID,
            clientSecret    : configAuth.linkedinAuth.clientSecret,
            callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
        },
        function(token, tokenSecret, profile, done) {
            User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    ));

    // =========================================================================
    // COMPANY SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('company-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with companyname
            usernameField: 'companyname',
            passwordField: 'compassword',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, companyname, password, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.companyname': companyname }, function (err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That company name is already taken.'));
                } else {

                    // if there is no user with that email
                    // create the user
                    var newUser = new User();
                    var newCompany = new Company();

                    // set the Company's local credentials
                    newUser.local.companyname = companyname;
                    newUser.local.compassword = newUser.generateHash(password); // use the generateHash function in our Company model
                    newUser.local.company.email = req.param('email');
                    newUser.local.company.address = req.param('address');
                    newUser.local.company.webpage = req.param('webpage');
                    newUser.companyref = newCompany;
                    newCompany.companyname = companyname;
                    newCompany.password = newUser.local.compassword;
                    newCompany._creator = newUser;


                    // save the Company
                    newCompany.save(function (err, data) {

                        console.log('Saved : ', data);
                        return (null, newCompany);
                    });

                    newUser.save(function (err, data) {
                        if (err)
                            throw err;
                        else console.log('Saved : ', data);
                        return done(null, newUser);
                    });

                }

            });


        }));




    // =========================================================================
    // COMPANY LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('company-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with companyname and compassword
            usernameField: 'companyname',
            passwordField: 'compassword',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, companyname, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.companyname': companyname }, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validCompanyPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            });


        }));
}



