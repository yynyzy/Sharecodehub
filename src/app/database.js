const mysql = require('mysql2')
const config = require('../app/config')

const connections = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
})

connections.getConnection((err, conn) => {
    conn.connect(err => {
        if (err) {
            console.log("数据库连接失败");
        } else {
            console.log("数据库连接成功");
        }
    })
})

//传出去一个 promise 形式的连接池
module.exports = connections.promise()