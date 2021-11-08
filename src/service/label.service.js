const connections = require('../app/database')

class LabelService {
    async create(name) {
        const statement = `
        INSERT INTO label (name) VALUES(?)
        `
        const result = await connections.execute(statement, [name])
        return result[0]
    }
    async getLabelByName(name) {
        const statement = `
        SELECT * FROM label WHERE name = ?;
        `
        const result = await connections.execute(statement, [name])
        return result[0]
    }
}

module.exports = new LabelService();