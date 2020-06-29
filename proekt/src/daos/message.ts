
import DataAccessObject from './dao'

import {Message} from "../types?"
import {DaoError} from '../errors'

import {IQueryable} from '../types?'


const _fields: object = {
    idMessage: "id",
    idSender: "id_sender",
    idConversation: "id_conversation",
    text: "text",
}

export default class MessageDAO extends DataAccessObject<Message> {
    constructor(driver: IQueryable, tableName: string) {
        super(driver, tableName)
    }

    async getConversationMessages(idConversation: number) : Promise<Message[]> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE ${_fields["idConversation"]}  = ${idConversation}`
            const rows = await this.driver.query(sql)
            return rows.map(x => this.tryConvert(x))
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async addOne(data: Message) : Promise<Message> {
        try {
            const {idSender, idConversation, text} = data
            const sql = `INSERT INTO ${this.tableName}(${_fields["idSender"]} , ${_fields["idConversation"]} , ${_fields["text"]} ) 
                            VALUES(${idSender}, ${idConversation}, ${text}) 
                        RETURNING *`           
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async updateByID(id: number, data: Message) : Promise<Message> {
        try {
            const {idSender, idConversation, text} = data
            const sql = `UPDATE ${this.tableName} SET 
                            ${_fields["idSender"]}  = ${idSender}, 
                            ${_fields["idConversation"]}  = ${idConversation}, 
                            ${_fields["text"]}  = ${text} 
                        WHERE id = ${id} 
                        RETURNING *`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error);
        }
    }

    async getByID(id: number) : Promise<Message> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE ${_fields["idMessage"]} = ${id}`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async deleteByID(id: number) : Promise<Message> {
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE ${_fields["idMessage"]}  = ${id} RETURNING *`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }
    
    
    tryConvert(data: object) : Message {
        let conversation = {}

        if (data == null)
            return null

        for (const [field, value] of Object.entries(_fields)) {
            conversation[field] = data[value]
        }

        return conversation as Message
        
    }
}
