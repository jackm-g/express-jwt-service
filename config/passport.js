var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var GithubStrategy = require('passport-github');

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log("verifyCallback - searching for profile in db");
  
    // Check if user in database
    User.findOne({ providerId: profile.id }, function (err, user) {
      if (user === null) {
        console.log("verifyCallback - No existing user found, creating new user");
        /*
        * If this is a new user, first grab either the users verified email address, or the first email address we are given, 
        * and use this, along with their profile information, to create a new user in our database.
        * When done, again call done with the newly created user.
        */
        const verifiedUsername = profile.username;
        const generatedEmail = profile.username + "@generated.generated"; // TODO this is not a real email
  
        new User(
          {
            email: generatedEmail,
            username: verifiedUsername,
            providerId: profile.id
          }
        ).save((error, user) => {
          if (error) {
            console.log("verifyCallback - save error: " + error);
          }
          done(error, user);
        });
      
      }
  
      // Return existing user if mongoose finds in db
      console.log("verifyCallback - user found: ");
      console.log(user);
      done(err, user)
    });
  
  }
  
  passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
    verifyCallback));

    
