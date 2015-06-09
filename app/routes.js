// app/routes.js
//Require each of our models.
var User = require('../app/models/user');
var Company = require('../app/models/company');
var Job = require('../app/models/job');

module.exports = function(app, passport) {
//Candidate
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // COMPANY SIGNUP ======================
    // =====================================
    // show the signup form
    app.get('/companysignup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('companysignup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/companysignup', passport.authenticate('company-signup', {
        successRedirect : '/companyprofile', // redirect to the secure profile section
        failureRedirect : '/companysignup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {

        Company.find({}, function (err, company) {
            if (err) return (err);
            console.log(company);
            res.render('profile.ejs', {
                company: company,
                user : req.user
            }
        ); // get the user out of session and pass to template
        });
    });
    //Go to edit Profile
    app.get('/editprofile', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('editprofile.ejs', { user : req.user });
    });
    // process the signup form
    app.post('/editprofile', passport.authenticate('local-signup', {
        successRedirect : '/profile' // redirect to the secure profile section

    }));


    // =====================================
    // COMPANY JOB POST SECTION ============
    // =====================================

    app.get('/jobpost', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('jobpost.ejs', { message: req.flash('signupMessage') });
    });




    // =====================================
    // COMPANY PROFILE SECTION =============
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/companyprofile', isLoggedIn, function(req, res) {
        //Query the Company collection and display results that match the logged in user.
        Company.findOne({'companyname': req.user.local.companyname}, function (err, company) {
            if (err) return (err);
            console.log(company);

            res.render('companyprofile.ejs', {
                    company: company,
                    user: req.user // get the company out of session and pass to template

                }
            );
        });
    });


    //Company

    // =====================================
    // COMPANY LOGIN =======================
    // =====================================
    // show the login form
    app.get('/companylogin', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('companylogin.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form

    app.post('/companylogin', passport.authenticate('company-login', {

        successRedirect : '/companyprofile', // redirect to the secure profile section
        failureRedirect : '/companylogin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/signup'
    }));

    // =====================================
    // LINKEDIN ROUTES =====================
    // =====================================
    // route for LINKEDIN authentication and login
    app.get('/auth/linkedin',
        passport.authenticate('linkedin'));

    app.get('/auth/linkedin/callback',
        passport.authenticate('linkedin', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
    //Go to edit Company Profile
    app.get('/editcompanyprofile', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('editcompanyprofile.ejs', { user : req.user });
    });
    // process the signup form
    app.post('/editcompanyprofile', passport.authenticate('local-companysignup', {
        successRedirect : '/companyprofile' // redirect to the secure profile section

    }));




    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


