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

    async getMomentById(_id) {
        const statement = `
        SELECT
        m.id id, m.content content, m.createAt createtime, m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url) user,
        IF(COUNT(l.id),JSON_ARRAYAGG(
            JSON_OBJECT('id',l.id,'name',l.name)
        ),null) labels,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename))
        FROM file WHERE m.id = file.moment_id) images
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id
        LEFT JOIN moment_label ml ON ml.moment_id = m.id
        LEFT JOIN label l ON ml.label_id = l.id
        WHERE m.id = ?
        GROUP BY m.id
        `
        const result = await connections.execute(statement, [_id])
        return result[0];
    }

    async getMomentList(offset, size) {
        const statement = `
        SELECT
            m.id id, m.content content, m.createAt createtime, m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name) user,
            (SELECT COUNT(*) FROM comment c WHERE c.comment_id = m.id) commentCount,
            (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename))
            FROM file WHERE m.id = file.moment_id) images
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
    async hasLabel(momentId, labelId) {
        const statement = `
        SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;
        `
        const [result] = await connections.execute(statement, [momentId, labelId])
        return result[0] ? true : false
    }
    async addLabels(momentId, labelId) {
        const statement = `
        INSERT INTO moment_label (moment_id,label_id) VALUES(?, ?)
        `
        const result = await connections.execute(statement, [momentId, labelId])
        return result
    }



}

module.exports = new MomentService()