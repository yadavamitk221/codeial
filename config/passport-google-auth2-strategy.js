const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: "868704576181-h4vson033vpnosm16eqq8e8cp5ljfr8t.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        // find User
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('error in google sstrategy-passport', err); return;}

            console.log(profile);

            if(user){
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    // console.log(profile.displayName)
                    if(err){console.log('error in google sstrategy-passport', err); return;}
                    return done(null, user);
                });
            }
        });
    }
));

module.exports = passport;