const connections = require('../app/database')

class fileService {
    async createAvatar(filename, mimetype, size, id) {
        const statement = `
        INSERT INTO avatar (filename, mimetype, size,user_id) VALUES(?,?,?,?)
        `
        const result = await connections.execute(statement, [filename, mimetype, size, id])
        return result
    }

    async getAvatarInfo(id) {
        const statement = `
        SELECT * FROM avatar WHERE user_id = ?
        `
        const [result] = await connections.execute(statement, [id])

        return result[0]
    }
}
module.exports = new fileService();