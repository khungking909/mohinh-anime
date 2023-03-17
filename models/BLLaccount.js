const DB = require('../config/connect')
const account = require('./account')
const bcrypt = require('bcryptjs');
class BLLAccount {
    mySingleton = (function () {
        var instance;
        function init(con) {
            return {
                getAllAccount() {
                    let connect = con
                    return new Promise((resolve, reject) => {
                        connect.then(connection => {
                            let query = 'select * from account'
                            connection.query(query, (err, data, fields) => {
                                if (err) reject(err)
                                let AllAccount = []
                                data.forEach(element => {
                                    AllAccount.push(new account(element.id,element.user,element.pass,element.role))
                                })
                                resolve(AllAccount)
                            })
                        })
                    })
                },
                addAccount(account)
                {
                    account.pass = bcrypt.hashSync(account.pass,10)
                    let connect = con
                    return new Promise(function(resolve,reject)
                    {
                        let query = `INSERT INTO ACCOUNT (id,user,pass,role) VALUES ('${account.id}','${account.user}','${account.pass}','${account.role}')`
                        connect.then(connection=>
                            {
                                connection.query(query,(err,result)=>
                                {
                                    if(err) reject(err)
                                    resolve('THANH CONG')
                                })
                            })
                    })
                },
                getAllGoogleAccount()
                {
                    let connect = con
                    return new Promise((resolve,reject)=>
                    {
                        let query = 'select * from googleaccount'
                        connect.then(connection=>
                            {
                                connection.query(query,(err,data,fields)=>
                                {
                                    if(err) reject(err)
                                    resolve(data)
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
module.exports = new BLLAccount