const DB = require('../config/connect')
const shopping = require('./shopping')
const jwt = require('jsonwebtoken')
require('dotenv').config()
class BLLShopping {
    mySingleton = (function () {
        var instance;
        function init(con) {
            return {
                getAllCart(userID) {
                    let connect = con
                    return new Promise((resolve, reject) => {
                        connect.then(connection => {
                            let query = `select * from shoppingcart1 where userid = '${userID}' `
                            connection.query(query, (err, data, fields) => {
                                if (err) reject(err)

                                resolve(data)
                            })
                        })
                    })
                },
                addSPinCart: function (id, userID) {
                    const connect = con
                    let query = `INSERT INTO shoppingcart1 (idsp,userid,quantity) VALUES ('${id}','${userID}', '${1}')`
                    this.getCartByUserID(userID).then(data => {
                        data.forEach(element => {
                            if (element.idsp == id) {
                                query = `UPDATE shoppingcart1 SET quantity = '${element.quantity + 1}' WHERE idsp = '${element.idsp}'`
                            }

                        })
                        connect.then(connection => {
                            connection.query(query, (err, results) => {
                                if (err) throw err;
                                console.log("1 record inserted");
                            })
                        })
                    })

                },
                getCartByUserID: function (userID) {
                    let connect = con
                    return new Promise((resolve, reject) => {
                        connect.then(connection => {
                            connection.query(`select * from shoppingcart1 where userid='${userID}'`, (err, data, fields) => {
                                if (err) reject(err)
                                resolve(data)
                            })
                        })
                    })
                },
                DeleteInGioHang: function (id,userID) {
                    const connect = con
                    return new Promise((resolve,reject)=>
                    {
                        let query = `DELETE FROM shoppingcart1 WHERE idsp = '${id}' AND userid ='${userID}'`
                    this.getAllCart(userID).then(data => {
                       
                        data.forEach(element => {
                            if (element.idsp == id && element.quantity > 1) {
                                query = `UPDATE shoppingcart1 SET quantity = '${element.quantity - 1}' WHERE idsp = '${element.idsp}'`
                            }
                        })
                        connect.then(connection => {
                            connection.query(query, (err, results) => {
                                if (err)  reject(err)
                                resolve('THANH CONG')
                            })
                        })
                    })
                    })
                }
            }
        }
        return {
            getInstance: function () {
                if (!instance) instance = init(DB.ConnectDB().then(con => con));
                return instance;
            }
        }
    })();

}
module.exports = new BLLShopping