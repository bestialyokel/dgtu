const {DataAccessObject} = require('../daos')

class MessageDAO extends DataAccessObject {
    constructor(driver, tableName) {
        super(driver, tableName)
    }

    async getOne(id) {
        const sql = `SELECT * FROM ${tableName} WHERE id=$1`

        const {rows} = await this.driver.query(sql, [id])
        return rows[0]
    }

    async getConversationMessages(idConversation) {
        const sql = `SELECT * FROM ${tableName} WHERE id_conversation=$1`

        const {rows} = await this.driver(sql, [idConversation])
        return rows
    }

    async getLastConversationMessage(idConversation) {
        const sql = `SELECT * FROM ${tableName} \
                        WHERE id_user=$1 \
                        ORDER BY id \
                        LIMIT 1`
        const {rows} = await this.driver(sql, [idConversation])
        return rows[0]
    }

    async addOne(data) {
        const {idSender, idConversation, text} = data
        const sql = `INSERT INTO ${tableName}(id_sender, id_conversation, text) 
                        VALUES($1, $2, $3) RETURNING id`
                              
        const {rows, rowCount} = await this.driver.query(sql, [idSender, idConversation, text])
        if (rowCount != 0)
            return rows[0].id
    }

    async updateOne(id, data) {
        const {idSender, idConversation, text} = data
        const sql = `UPDATE ${tableName} SET 
                            id_sender=$1, 
                            id_conversation=$2, 
                            text=$3 
                        WHERE id=$4`

        const {rowCount} = await this.driver.query(sql, [idSender, idConversation, text, id])
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

module.exports = MessageDAO