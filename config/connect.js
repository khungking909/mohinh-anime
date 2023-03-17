const mysql = require('mysql');
module.exports.ConnectDB = () => {
    return new Promise((resolve, reject) => {
        const con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: 'mohinhanime'
        });
        con.connect(function (err) {
            if (err)
                reject(err)
            resolve(con)
            console.log("Connected!");
        });
    })
}
module.exports.CloseDB =(con) =>
{
    console.log('Close DB')
    con.destroy()
}
