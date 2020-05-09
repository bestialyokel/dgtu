import DataAccessObject from './dao'
import {Pool} from 'pg'
import {Conversation} from "../types?"
import {DaoError} from '../errors'

export default class ConversationDAO extends DataAccessObject<Conversation> {

    constructor(driver: Pool, tableName: string) {
        super(driver, tableName)
    }

    async getOne(id: number) : Promise<Conversation> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id = ${id}`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async deleteOne(id: number) : Promise<Conversation> {
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE id = ${id} RETURNING *`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async addOne(data: Conversation) : Promise<Conversation> {
        try {
            const {name} = data
            const sql = `INSERT INTO ${this.tableName}(name) VALUES ( ${name} ) RETURNING *`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async updateOne(id: number, data: Conversation) : Promise<Conversation> {
        try {
            const {name} = data
            const sql = `UPDATE ${this.tableName} SET name = ${name} WHERE id = ${id} RETURNING *`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch (error) {
            throw new DaoError(error)
        }
    }

    tryConvert(data: object) : Conversation {
        if (data instanceof Object) {
            return {
                name: data["name"],
                id: data["id"]
            } as Conversation
        }
        return null
    }
}