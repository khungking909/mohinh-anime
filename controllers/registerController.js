const BLLaccount = require('../models/BLLaccount')
const account = require('../models/account')
class register {
    get(req, res) {
       
        res.render('register')
    }
    post(req, res) {
        if(req.body.password1==req.body.password2)
        {
           BLLaccount.mySingleton.getInstance().getAllAccount().then(data=>
            {
                BLLaccount.mySingleton.getInstance().addAccount(new account(data.length+1,req.body.username,req.body.password1,'user'))
                res.redirect('/login')
            })
        }
        else res.render('register',{err:'Mật khẩu không khớp'})

    }
}
module.exports = new register