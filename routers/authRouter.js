const express = require('express')
const router = express.Router()
const passport = require('passport')
const passportConfig = require('../middleware/passport')
require('../middleware/auth-facebook')
const jwt = require('jsonwebtoken')
router.get('/google', passport.authenticate('google', {
    scope:
        ['email', 'profile']
}
))
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
}))
router.get('/facebook', passport.authenticate('facebook'))
router.get('/facebook/callback', passport.authenticate('facebook',{
    successRedirect:'/'
}),(req,res)=>
{
    res.json(req.user)
})
module.exports = router