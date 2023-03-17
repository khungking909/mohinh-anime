const DB = require('../config/connect')
const googleaccount = require('./googleaccount')
class BLLAccount {
    mySingleton = (function () {
        var instance;
        function init(con) {
            return {
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
                                    let gg = []
                                    data.forEach(element => {
                                        gg.push(new googleaccount(element.id,element.email,element.role))
                                    });
                                    resolve(gg)
                                })
                            })
                    })
                },
                addGoogleAccount(googleaccount)
                {
                    let connect =con
                    return new Promise((resolve,reject)=>
                    {
                        let query = `INSERT INTO googleaccount(id,email,role) VALUES ('${googleaccount.id}','${googleaccount.email}','${googleaccount.role}')`
                        connect.then(connection=>
                            {
                                connection.query(query,(err,result)=>
                                {
                                    if(err) reject(err)
                                    resolve('thanh cong')
                                })
                            })
                    })
                },
                getGoogleAccountByEmail(email)
                {
                    return new Promise((resolve,reject)=>
                    {
                        this.getAllGoogleAccount().then(data=>
                            { 
                                data.forEach(element=>
                                    {
                                        if(email==element.email)
                                        {
                                            resolve(element)
                                        }
                                    })
                                reject('0 element found')
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