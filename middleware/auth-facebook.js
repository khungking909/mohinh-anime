const FacebookStrategy = require('passport-facebook').Strategy
const passport = require('passport')
passport.use(new FacebookStrategy({
    clientID: '768929437720727',
    clientSecret: '0faaff1424bc252827b7f231fd36e821',
    callbackURL: "http://localhost:3333/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
))
passport.serializeUser((user,done)=>
{
    done(null,user)
})
passport.deserializeUser((user,done)=>
{
    done(null,user)
})