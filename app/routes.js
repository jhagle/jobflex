// app/routes.js


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
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
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
    // COMPANY PROFILE SECTION =============
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/companyprofile', isLoggedIn, function(req, res) {

        res.render('companyprofile.ejs', {
                user : req.user // get the company out of session and pass to template
            }

        );
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


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


