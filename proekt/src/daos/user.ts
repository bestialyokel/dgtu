import DataAccessObject from './dao'
import {User} from "../types?"
import {DaoError} from '../errors'
import {IQueryable} from '../types?'

const _fields: object = {
    idUser: "id",
    login: "login",
    password: "password",
}

export default class UserDAO extends DataAccessObject<User> {
    constructor(driver: IQueryable, tableName: string) {
        super(driver, tableName)
    }

    async getByID(id: number) : Promise<User> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE ${_fields["idUser"]} = ${id}`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async deleteByID(id: number) : Promise<User> {
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE ${_fields["idUser"]} = ${id} RETURNING *`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async addOne(data: User) : Promise<User> {
        try {
            const {login, password} = data
            const sql = `INSERT INTO ${this.tableName}(${_fields["login"]}, ${_fields["password"]}) VALUES (${login}, ${password}) RETURNING *`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async updateByID(id: number, data: User) : Promise<User> {
        try {
            const {login, password} = data
            const sql = `UPDATE ${this.tableName} SET ${_fields["login"]} = ${login}, ${_fields["password"]} = ${password} WHERE ${_fields["idUser"]} = ${id} RETURNING *`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    tryConvert(data: object) : User {
        let conversation = {}
        
        if (data == null)
            return null


        for (const [field, value] of Object.entries(_fields)) {
            conversation[field] = data[value]
        }

        return conversation as User
        
    }
}

