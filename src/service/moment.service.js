/**
 *  用于将用户发表的心情保存到数据库中
 */
const connections = require('../app/database')

class MomentService {
    //向数据库插入数据
    async create(userid, content) {
        const statement = `INSERT INTO moment(content,user_id) VALUES(?,?)`
        const result = await connections.execute(statement, [content, userid])
    }

    async getMomentById(id) {
        const statement = `
        SELECT
            m.id id, m.content content, m.createAt createtime, m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name) user
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        WHERE m.id = ?;
        `
        const result = await connections.execute(statement, [id])
        return result[0];
    }

    async getMomentList(offset, size) {
        const statement = `
        SELECT
            m.id id, m.content content, m.createAt createtime, m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name) user,
            (SELECT COUNT(*) FROM comment c WHERE c.comment_id = m.id) commentCount
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        LIMIT ?, ?;
        `
        const result = await connections.execute(statement, [offset, size])
        return result[0];
    }
    //用于修改用户的心情文章
    async update(content, momentId) {
        const statement = `
        UPDATE moment SET content = ? WHERE id = ?;
       `
        const result = await connections.execute(statement, [content, momentId])
        return result
    }
    async remove(momentId) {
        const statement = `
        DELETE FROM moment WHERE id = ?;
       `
        const result = await connections.execute(statement, [momentId])
        return result
    }

    async addLabels(labels) {
        return result
    }

}

module.exports = new MomentService()