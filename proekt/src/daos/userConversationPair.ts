import DataAccessObject from './dao'
import {Pool} from 'pg'
import {UserConversationPair, User} from "../types?"
import {DaoError} from '../errors'



export default class UserConversationPairDAO extends DataAccessObject<UserConversationPair> {
    constructor(driver: Pool, tableName: string) {
        super(driver, tableName)
    }

    async addOne(data: UserConversationPair) : Promise<UserConversationPair> {
        try {
            const {idUser, idConversation} = data
            const sql = `INSERT INTO ${this.tableName}(id_user, id_conversation) VALUES(${idUser}, ${idConversation}) RETURNING *`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async getUserConversations(idUser: number) : Promise<UserConversationPair[]> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id_user = ${idUser}`
            const {rows} = await this.driver.query(sql)
            return rows.map(x => this.tryConvert(x))
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async getConversationUsers(idConversation: number) : Promise<UserConversationPair[]> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id_conversation = ${idConversation}`
            const {rows} = await this.driver.query(sql)
            return rows.map(x => this.tryConvert(x))
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async deleteOne(data: UserConversationPair) : Promise<UserConversationPair> {
        try {
            const {idUser, idConversation} = data
            const sql = `DELETE FROM ${this.tableName} WHERE id_user = ${idUser} AND id_conversation = ${idConversation} RETURNING *`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    tryConvert(data: object) : UserConversationPair{
        if (data instanceof Object) {
            return {
                idUser: data["id_user"],
                idConversation: data["id_conversation"]
            } as UserConversationPair
        }
        return null
    } 
}