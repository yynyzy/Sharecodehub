const connections = require('../app/database')

class UserService {
    async create(user) {
        //往数据库里添加用户注册信息
        const { name, password } = user
        const statement = `INSERT INTO user(name,password) VALUES(?,?);`
        const result = await connections.execute(statement, [name, password])
        return result[0];
    }

    async getUserByName(name) {
        const statement = `SELECT * FROM user WHERE name = ?;`
        const result = await connections.execute(statement, [name])
        return result[0]
    }
    //上传图片头像后，往user表中新加新的一列
    async updataAvatarUrlById(AvatarUrl, userId) {
        console.log(AvatarUrl);
        const statement = `UPDATE user SET avatar_url = ? WHERE id = ?`
        const result = await connections.execute(statement, [AvatarUrl, userId])
        return result
    }
}
module.exports = new UserService();