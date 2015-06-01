/**
 * Created by crystalgamez on 5/29/15.
 */

// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID' 		: '793312564117337', // your App ID
        'clientSecret' 	: '259017870006f0030a4afc4abb136deb', // your App Secret
        'callbackURL' 	: 'http://localhost:1343/auth/facebook/callback'
    },

    'linkedinAuth' : {
        'clientID' 		: '77itko54f4osba', // your App ID
        'clientSecret' 	: 'Yc58frigFlGUz3cR', // your App Secret
        'callbackURL' 	: 'http://localhost:1343/auth/linkedin/callback'
    }

};
