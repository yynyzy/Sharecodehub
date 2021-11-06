const connections = require('../app/database')

class CommentService {
    async create(userId, momentId, content) {
        const statement = `
        INSERT INTO comment (content,moment_id,user_id) VALUES(?,?,?)
        `
        const result = await connections.execute(statement, [content, momentId, userId])
        return result
    }
}
module.exports = new CommentService();