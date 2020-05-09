import DataAccessObject from './dao'
import {Pool} from 'pg'
import {UserToken, User} from "../types?"
import {DaoError} from '../errors'



export default class UserTokenDAO extends DataAccessObject<UserToken> {
    constructor(driver: Pool, tableName: string) {
        super(driver, tableName)
    }
    
    async getUserTokens(id: number) : Promise<UserToken[]> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id_user = ${id}}`
            const {rows} = await this.driver.query(sql)
            return rows.map(x => this.tryConvert(x))
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async findOne(key: string) : Promise<UserToken> {
        try {
            const sql = `SELECT id FROM ${this.tableName} WHERE key = ${key}`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async addOne(data: UserToken) {
        try {
            const {idUser, key} = data
            const sql = `INSERT INTO ${this.tableName}(id_user, key) VALUES(${idUser}, ${key}) RETURNING *`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async getOne(id: number) : Promise<UserToken> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id = ${id}`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async deleteOne(id: number) : Promise<UserToken> {
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE id = ${id} RETURNING *`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    tryConvert(data: object) : UserToken {
        if (data instanceof Object) {
            return {
                id: data["id"],
                key: data["key"],
                idUser: data["id_user"]
            } as UserToken
        }
        return null
    }
}