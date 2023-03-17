const jwt = require('jsonwebtoken')
require('dotenv').config()
class home
{
    async get(req,res)
    {
        let username =""
        let img 
        let displayName
        if(req.auth=='normaluser')
        {
            let data= jwt.verify(req.cookies.token,process.env.ACCESS_TOKEN_KEY)
            username = data.accountName.toUpperCase()
        }
        else if(req.auth=='google') 
        {
            img = req.user.photos[0].value
            displayName = req.user.displayName
        }
        console.log(req.user)
        res.render('home',{user : username,img:img,displayName:displayName})

    }
}
module.exports = new home