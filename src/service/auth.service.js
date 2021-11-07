/**
 *  负责用户修改心情方面的权限验证的数据库服务
 */
const connections = require('../app/database')
class AuthService {
    //查询某条数据的外键是否是关联某个用户，有就是有权限
    async checkResource(tableName, resourceId, id) {
        const statement = `
        SELECT * FROM ${tableName} WHERE id = ? AND user_id  =?;
        `
        const result = await connections.execute(statement, [resourceId, id])
        if (result[0].length == 0) {
            return false
        } else {
            return true
        }
    }
}

module.exports = new AuthService()