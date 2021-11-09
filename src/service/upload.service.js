const connections = require('../app/database')
class uploadService {
    async createAvatar(filename, mimetype, size, id) {
        const statement = `
        INSERT INTO avatar (filename, mimetype, size,user_id) VALUES(?,?,?,?)
        `
        const result = await connections.execute(statement, [filename, mimetype, size, id])
        return result
    }
}
module.exports = new UploadService();