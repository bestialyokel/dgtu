const {DataAccessObject} = require('../daos')

class ConversationDAO extends DataAccessObject {
    constructor(driver, tableName) {
        super(driver, tableName)
    }

    async getOne(id) {
        const sql = `SELECT * FROM ${tableName} WHERE id=$1`
        const {rows} = await this.driver.query(sql, [id])
        return rows[0]
    }


    async addOne(data) {
        const {name} = data
        const sql = `INSERT INTO ${tableName}(name) VALUES($1) RETURNING id`
        const {rows, rowCount} = await this.driver.query(sql, [name])
        if (rowCount != 0)
            return rows[0].id
    }

    async updateOne(id, data) {
        const {name} = data
        const sql = `UPDATE ${tableName} SET name = $1 WHERE id=$2`

        const {rowCount} = await this.driver.query(sql, [name, id])
        if (rowCount != 0) 
            return id
    }
    
    async deleteOne(id) {
        const sql = `DELETE FROM ${tableName} WHERE id=$1`

        const {rowCount} = await this.driver.query(sql, [id])
        if (rowCount != 0)
            return id
    }
}

module.exports = ConversationDAO