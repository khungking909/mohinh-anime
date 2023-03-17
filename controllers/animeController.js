const BLLsanpham = require('../models/BLLsanpham')
const jwt = require('jsonwebtoken')
const BLLgoogleAccount = require('../models/BLLgoogleAccount')
require('dotenv').config()
class animeController {
    async get(req, res) {
        if (req.auth == 'google') {
            BLLsanpham.mySingleton.getInstance().getAllSanPham().then(data => {
                BLLsanpham.mySingleton.getInstance().getAllKind().then(kind => {
                    BLLgoogleAccount.mySingleton.getInstance().getGoogleAccountByEmail(req.user.email).then(gg => {
                        let dis = 'none'
                        if (gg.role == 'admin') dis = 'block'
                        res.render('animeMain', { data, kind: kind, img: req.user.photos[0].value, display: dis })
                    })
                })
            })
        }
        else {
            BLLsanpham.mySingleton.getInstance().getAllSanPham().then(data => {
                BLLsanpham.mySingleton.getInstance().getAllKind().then(kind => {
                    let dis = 'none'
                    let account = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_KEY)
                    if (account.role == 'admin') dis = 'block'
                    res.render('animeMain', { data, kind: kind, user: account.accountName.toUpperCase(), display: dis })
                })
            })
        }
    }
    async details(req, res) {
        if (req.auth == 'google') {
            let id = req.params.id
            let email = req.user.email
            BLLgoogleAccount.mySingleton.getInstance().getGoogleAccountByEmail(email).then(user => {
                BLLsanpham.mySingleton.getInstance().getSanPhamByID(id).then(data => {
                    let dis = 'none'
                    if (user.role == 'admin') dis = 'block'
                    res.render('animeDetails', { data, display: dis, img: req.user.photos[0].value })
                })
            })
        }
        else {
            let id = req.params.id
            BLLsanpham.mySingleton.getInstance().getSanPhamByID(id).then(data => {
                let dis = 'none'
                let account = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_KEY)
                if (account.role == 'admin') dis = 'block'
                res.render('animeDetails', { data, display: dis, user: account.accountName.toUpperCase() })
            })
        }
    }
    async kind(req, res) {
        BLLsanpham.mySingleton.getInstance().getSanPhamByKind(req.params.kind).then(data => {
            BLLsanpham.mySingleton.getInstance().getAllKind().then(ctg => {
                let dis = 'none'
                let account = jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_KEY)
                if (account.role == 'admin') dis = 'block'
                res.render('animeMain', { data, display: dis, kind: ctg, user: account.accountName.toUpperCase() })
            })
        })
    }
}
module.exports = new animeController