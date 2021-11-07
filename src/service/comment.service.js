const connections = require('../app/database')

class CommentService {
    async create(userId, momentId, content) {
        const statement = `
        INSERT INTO comment (content,moment_id,user_id) VALUES(?,?,?)
        `
        const result = await connections.execute(statement, [content, momentId, userId])
        return result
    }
    async reply(userId, content, momentId, commentId) {
        const statement = `
        INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES(?,?,?,?)
        `
        const result = await connections.execute(statement, [content, momentId, userId, commentId])
        return result
    }
    async update(content, commentId) {
        const statement = `
        UPDATE comment SET content= ? WHERE id= ?;
        `
        const result = await connections.execute(statement, [content, commentId])
        return result
    }
    async remove(commentId) {
        const statement = `
        DELETE FROM comment WHERE id= ?;
        `
        const result = await connections.execute(statement, [commentId])
        return result
    }
}
module.exports = new CommentService();