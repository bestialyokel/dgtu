import DataAccessObject from './dao'
import {Pool} from 'pg'
import {User} from "../types?"
import {DaoError} from '../errors'



export default class UserDAO extends DataAccessObject<User> {
    constructor(driver: Pool, tableName: string) {
        super(driver, tableName)
    }

    async getOne(id: number) : Promise<User> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id = ${id}`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async deleteOne(id: number) : Promise<User> {
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE id = ${id} RETURNING *`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async addOne(data: User) : Promise<User> {
        try {
            const {login, password} = data
            const sql = `INSERT INTO ${this.tableName}(login, password) VALUES (${login}, ${password}) RETURNING *`
            const {rows} = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async updateOne(id: number, data: User) : Promise<User> {
        try {
            const {login, password} = data
            const sql = `UPDATE ${this.tableName} SET login = ${login}, password = ${password} WHERE id = ${id} RETURNING *`
            const {rows} = await this.driver.query(sql, [login, password, id])
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    tryConvert(data: object) : User {
        if (data instanceof Object) {
            return {
                id: data["id"],
                login: data["login"],
                password: data["password"]
            } as User
        }
        return null
    }
}