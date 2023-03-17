const DB = require('../config/connect')
const kind = require('../models/kind')
class BLLsanpham {
    mySingleton = (function () {
        var instance;
        function init(con) {
            return {
                getAllSanPham: function () {
                    const connect = con
                    return new Promise((resolve, reject) => {
                        connect.then(connection => {
                            connection.query("select * from mohinh", (err, data, fields) => {
                                if (err) reject(err)
                                resolve(data)
                            })
                        })
                    })
                },
                getSanPhamByKind: function (datasearch) {
                    return new Promise((resolve, reject) => {
                        this.getAllSanPham().then(data => {
                            let sp = []
                            data.forEach(element => {
                                if (element.kind == datasearch)
                                    sp.push(element)
                            });
                            resolve(sp)
                        })
                    })
                },
                getSanPhamByID: function (id) {
                    return new Promise((resolve, reject) => {
                        this.getAllSanPham().then(data => {
                            let sp = []
                            data.forEach(element => {
                                if (element.id == id)
                                    sp.push(element)
                            })
                            resolve(sp)
                        })
                    })
                },
                getAllKind: function()
                {
                    return new Promise((resolve,reject)=>
                    {
                        
                        this.getAllSanPham().then(data=>
                            {
                                let kinds = []
                                kinds.push(new kind(data[0].name.toLowerCase().UpperCase(),data[0].kind))
                                data.forEach(element=>
                                    {
                                        let count = 0
                                        kinds.forEach(kind=>
                                            {
                                                if(element.kind == kind.kind) count++
                                            })
                                        if(count==0) kinds.push(new kind(element.name.toLowerCase().UpperCase(),element.kind))
                                    })
                                resolve(kinds)
                            })
                            
                    })
                },
                addSanPham: function(sanpham)
                {
                    const connect = con
                    return new Promise((resolve,reject)=>
                    {
                        connect.then(connection=>
                            {
                                let query = `INSERT INTO mohinh (id,name,discription,price,kind,img) VALUES ('${sanpham.id}','${sanpham.name}','${sanpham.description}','${sanpham.price}','${sanpham.kind}','${sanpham.img}')`
                                connection.query(query,(err,result)=>
                                {
                                    if(err) reject(err)
                                    resolve('Thanh Cong')
                                })
                            })
                    })
                },
                updateSanPham: function(sanpham)
                {
                    let connect = con
                    return new Promise((resolve,reject)=>
                    {
                        connect.then(connection=>
                            {
                                let query = `update mohinh set name = '${sanpham.name}',discription = '${sanpham.description}',price = '${sanpham.price}',kind = '${sanpham.kind}',img ='${sanpham.img}' where id = '${sanpham.id}'`
                                connection.query(query,(err,result)=>
                                {
                                    if(err) reject(err)
                                    resolve('THANH CONG')
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
module.exports = new BLLsanpham
