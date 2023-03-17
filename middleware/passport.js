const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const BLLgoogleAccount = require('../models/BLLgoogleAccount')
const BLLaccount = require('../models/BLLaccount')
const googleaccount = require('../models/googleaccount')
passport.use(new GoogleStrategy({
    clientID: '316805797395-97ns4d8chagpja8md4ueblpti2d9pa7i.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3333/auth/google/callback',
    passReqToCallback: true
},(req, accessToken, refreshToken, profile, next)=>
{
    BLLgoogleAccount.mySingleton.getInstance().getAllGoogleAccount().then(gg=>
    {
        let count = 0
        gg.forEach(element => {
                if(element.email==profile.email) count++
        })
        if(count==0) 
        {
            BLLaccount.mySingleton.getInstance().getAllAccount().then(ac=> ac.length+gg.length)
            .then(length =>
                {
                    let newuser = new googleaccount(length+1,profile.email,'user')
                    BLLgoogleAccount.mySingleton.getInstance().addGoogleAccount(newuser)
                })
        }
    })
    
    next(null,profile);
}))
passport.serializeUser((user,done)=>
{
    done(null,user)
})
passport.deserializeUser((user,done)=>
{
    done(null,user)
})
