import DataAccessObject from './dao'

import {Conversation} from "../types?"
import {DaoError} from '../errors'
import {IQueryable} from '../types?'


const _fields: object = {
    idConversation: "id",
    name: "name"
}

export default class ConversationDAO extends DataAccessObject<Conversation> {
    constructor(driver: IQueryable, tableName: string) {
        super(driver, tableName)
    }

    async getByID(id: number) : Promise<Conversation> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE ${_fields["idConversation"]} = ${id}`
            const rows = await this.driver.queryDetailed(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async deleteByID(id: number) : Promise<Conversation> {
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE ${_fields["idConversation"]} = ${id} RETURNING *`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async addOne(data: Conversation) : Promise<Conversation> {
        try {
            const {name} = data
            const sql = `INSERT INTO ${this.tableName}(${_fields["name"]}) VALUES ( ${name} ) RETURNING *`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async updateByID(id: number, data: Conversation) : Promise<Conversation> {
        try {
            const {name} = data
            const sql = `UPDATE ${this.tableName} SET ${_fields["name"]} = ${name} WHERE ${_fields["idConversation"]} = ${id} RETURNING *`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch (error) {
            throw new DaoError(error)
        }
    }

    tryConvert(data: object) : Conversation {
        let conversation = {}

        if (data == null)
            return null

        for (const [field, value] of Object.entries(_fields)) {
            conversation[field] = data[value]
        }

        return conversation as Conversation
        
    }
}