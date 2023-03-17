const BLLShopping = require('../models/BLLshoppingcart')
const BLLsanpham = require('../models/BLLsanpham')
const shop = require('../models/shopping')
const jwt = require('jsonwebtoken')
const BLLgoogleAccount = require('../models/BLLgoogleAccount')
require('dotenv').config()
class shopping {
    async get(req, res) {
        if (req.auth == 'google') {
            let email = req.user.email
            BLLgoogleAccount.mySingleton.getInstance().getGoogleAccountByEmail(email).then(user => {
                let dis = 'none'
                if (user.role == 'admin') dis = 'block'
                BLLShopping.mySingleton.getInstance().getAllCart(user.id).then(cart => {
                    BLLsanpham.mySingleton.getInstance().getAllSanPham().then(sp => {
                        let data = []
                        sp.forEach(element => {
                            cart.forEach(cart => {
                                if (cart.idsp == element.id) {
                                    let sumprice = cart.quantity * element.price
                                    data.push(new shop(cart.idsp, cart.userID, cart.quantity, element.img, element.price, sumprice, element.discription))
                                }
                            })
                        })
                        res.render('shopping', { data, display: dis, img: req.user.photos[0].value, header: cart.length })
                    })
                })
            })

        }
        else {
            let dis = 'none'
            let account = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_KEY)
            if (account.role == 'admin') dis = 'block'
            let username = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_KEY)
            BLLShopping.mySingleton.getInstance().getAllCart(username.id).then(cart => {
                BLLsanpham.mySingleton.getInstance().getAllSanPham().then(sp => {
                    let data = []
                    sp.forEach(element => {
                        cart.forEach(cart => {
                            if (cart.idsp == element.id) {
                                let sumprice = cart.quantity * element.price
                                data.push(new shop(cart.idsp, cart.userID, cart.quantity, element.img, element.price, sumprice, element.discription))
                            }
                        })
                    })
                    res.render('shopping', { data, display: dis, user: username.accountName.toUpperCase(), header: cart.length })
                })
            })
        }
    }
    async post(req, res) {
        let id = req.params.id
        if (req.auth == 'google') {
            let email = req.user.email
            BLLgoogleAccount.mySingleton.getInstance().getGoogleAccountByEmail(email).then(user => {
                BLLShopping.mySingleton.getInstance().addSPinCart(id, user.id)
                res.redirect('back')
            })
        }
        else {
            let user = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_KEY)
            BLLShopping.mySingleton.getInstance().addSPinCart(id, user.id)
            res.redirect('back')
        }
    }
    async del(req, res) {
        let id = req.params.id
        let user = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_KEY)
        BLLShopping.mySingleton.getInstance().DeleteInGioHang(id, user.id).then(
            res.redirect('back')
        )
    }
}
module.exports = new shopping