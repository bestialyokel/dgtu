const DataAccessObject = require(`../daos`)

class UserConversationPairDAO extends DataAccessObject {
    constructor(driver, tableName) {
        super(driver, tableName)
    }

    async addOne({idUser, idConversation}) {
        const sql = `INSERT INTO ${tableName}(id_user, id_conversation) VALUES($1, $2) RETURNING id`

        const {rows, rowCount} = await this.driver.query(sql, [idUser, idConversation])
        if (rowCount != 0)
            return rows[0].id
    }

    async getPersonalDialogID(idUser1, idUser2) {
        throw "poka hz"
    }

    async deleteOne({idUser, idConversation}) {
        const sql = `DELETE FROM ${tableName} WHERE id_user=$1 AND id_conversation=$2`

        const {rowCount} = await this.driver.query(sql, [idUser, idConversation])
        if (rowCount != 0)
            return {idUser, idConversation}
    }

}

module.exports = UserConversationPairDAO