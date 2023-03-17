const jwt = require('jsonwebtoken')
require('dotenv').config()
module.exports = async (req,res,next)=>
{
    let user = jwt.verify(req.cookies.token,process.env.ACCESS_TOKEN_KEY)
    if(user.role=='admin') return next()
    else res.sendStatus(403)
}