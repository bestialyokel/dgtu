const DataAccessObject = require(`../daos`)

class UserTokenDAO extends DataAccessObject {
    constructor(driver) {
        super(driver)
    }

    async getOne(key) {
        const sql = `SELECT * FROM ${tableName} WHERE key=$1`

        const {rows} = await this.driver.query(sql, [key])
        return rows[0]
    }

    async addOne({idUser, key}) {
        const sql = `INSERT INTO ${tableName}(id_user, key) VALUES($1, $2) RETURNING key`

        const {rows, rowCount} = await this.driver.query(sql, [idUser, key])
        if (rowCount != 0)
            return rows[0].key
    }

    async deleteOne({idUser, key}) {
        const sql = `DELETE FROM ${tableName} WHERE id_user=$1 AND key=$2`

        const {rowCount} = await this.driver.query(sql, [idUser, key])
        if (rowCount != 0)
            return {idUser, idConversation}
    }

}

module.exports = UserTokenDAO