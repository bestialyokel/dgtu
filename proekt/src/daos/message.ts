
import DataAccessObject from './dao'
import {Pool} from 'pg'
import {Message} from "../types?"
import {DaoError} from '../errors'



export default class MessageDAO extends DataAccessObject<Message> {
    constructor(driver: Pool, tableName: string) {
        super(driver, tableName)
    }

    async getConversationMessages(idConversation: number) : Promise<Message[]> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id_conversation = ${idConversation}`
            const {rows} = await this.driver.query(sql)
            return rows.map(x => this.tryConvert(x))
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async addOne(data: Message) : Promise<Message> {
        try {
            const {idSender, idConversation, text} = data
            const sql = `INSERT INTO ${this.tableName}(id_sender, id_conversation, text) 
                            VALUES(${idSender}, ${idConversation}, ${text}) 
                        RETURNING *`           
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async updateOne(id: number, data: Message) : Promise<Message> {
        try {
            const {idSender, idConversation, text} = data
            const sql = `UPDATE ${this.tableName} SET 
                            id_sender = ${idSender}, 
                            id_conversation = ${idConversation}, 
                            text = ${text} 
                        WHERE id = ${id} 
                        RETURNING *`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error);
        }
    }

    async getOne(id: number) : Promise<Message> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id = ${id}`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async deleteOne(id: number) : Promise<Message> {
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE id = ${id} RETURNING *`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }
    
    
    tryConvert(data: object) : Message {
        if (data instanceof Object) {
            return {
                id: data["id"],
                idSender: data["id_sender"],
                idConversation: data["id_conversation"],
                text: data["text"]
            } as Message
        } 
        return null
    }
}