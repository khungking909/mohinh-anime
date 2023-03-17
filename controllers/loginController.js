const jwt = require('jsonwebtoken')
const BLLAccount = require('../models/BLLaccount')
require('dotenv').config()
const bcrypt = require('bcryptjs')
class login {
    async get(req, res) {
        res.render('login', { user: 'ĐĂNG NHẬP/ĐĂNG KÝ' })
    }
    async post(req, res, next) {
        BLLAccount.mySingleton.getInstance().getAllAccount().then(data => {
            let count = 0
            let user = req.body.username
            let pass = req.body.password
            let token
            data.forEach(element => {
                if (element.user == user) {
                    count = 1
                    if (bcrypt.compareSync(pass,element.pass)) {
                        token = jwt.sign({ accountName: element.user, id: element.id, role: element.role }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '1d' })
                        count = 2
                    }
                }
            })
            let err
            switch (count) {
                case 0:
                    {
                        err = "Tài khoản không chính xác"
                        break
                    }
                case 1:
                    {
                        err = "Mật khẩu không chính xác"
                        break
                    }
            }
            if (count == 2) {
                res.cookie('token', token, 1)
                res.redirect('/')
            } else res.render('login',{user:'ĐĂNG NHẬP/ĐĂNG KÝ',err:err})
        })
    }

}
module.exports = new login