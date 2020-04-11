const DataAccessObject = require('../daos')

class UserDAO extends DataAccessObject {
    constructor(driver, tableName) {
        super(driver, tableName)
    }

    async getAll() {
        const sql = `SELECT id FROM ${tableName}`
        const {rows} = await this.driver.query(sql)
        return rows.map(x => x.id)
    }

    async getOne(id) {
        const sql = `SELECT * FROM ${tableName} WHERE id=$1`
        const {rows} = await this.driver.query(sql, [id])
        return rows[0]
    }

    async addOne(data) {
        const {login, password} = data
        const sql = `INSERT INTO ${tableName}(login, password) VALUES($1, $2) RETURNING id`

        const {rows, rowCount} = await this.driver.query(sql, [login, password])
        if (rowCount != 0)
            return rows[0].id
    }

    async updateOne(id, data) {
        const {login, password} = data
        const sql = `UPDATE ${tableName} SET login=$1, password=$2 WHERE id=$3`

        const {rowCount} = await this.driver.query(sql, [login, password, id])
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

module.exports = UserDAO