import DataAccessObject from './dao'
import {UserConversationPair} from "../types?"
import {DaoError} from '../errors'
import {IQueryable} from '../types?'

const _fields: object = {
    idUser: "id_user",
    idConversation: "id_conversation"
}

export default class UserConversationPairDAO extends DataAccessObject<UserConversationPair> {
    constructor(driver: IQueryable, tableName: string) {
        super(driver, tableName)
    }

    updateByID() : never {
        throw "plsno"
    }

    getByID() : never {
        throw "plsno"
    }

    deleteByID() : never {
        throw "plsno"
    }
    
    

    async addOne(data: UserConversationPair) : Promise<UserConversationPair> {
        try {
            const {idUser, idConversation} = data
            const sql = `INSERT INTO ${this.tableName}(${_fields["idUser"]}, ${_fields["idConversation"]}) VALUES(${idUser}, ${idConversation}) RETURNING *`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async getUserConversationsIDs(idUser: number) : Promise<UserConversationPair[]> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE ${_fields["idUser"]} = ${idUser}`
            const rows = await this.driver.query(sql)
            return rows.map(x => this.tryConvert(x))
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async getConversationUsersIDs(idConversation: number) : Promise<UserConversationPair[]> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE ${_fields["idConversation"]} = ${idConversation}`
            const rows = await this.driver.query(sql)
            return rows.map(x => this.tryConvert(x))
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async deleteOne(data: UserConversationPair) : Promise<UserConversationPair> {
        try {
            const {idUser, idConversation} = data
            const sql = `DELETE FROM ${this.tableName} WHERE ${_fields["idUser"]} = ${idUser} AND ${_fields["idConversation"]} = ${idConversation} RETURNING *`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    tryConvert(data: object) : UserConversationPair {
        let conversation = {}

        if (data == null)
            return null

        for (const [field, value] of Object.entries(_fields)) {
            conversation[field] = data[value]
        }

        return conversation as UserConversationPair
        
    }
}

