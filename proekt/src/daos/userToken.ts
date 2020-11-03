import DataAccessObject from './dao'
import {UserToken} from "../types?"
import {DaoError} from '../errors'
import {IQueryable} from '../types?'


const _fields: object = {
    idKey: "id_user",
    idUser: "id_user",
    key: "key"
}

export default class UserTokenDAO extends DataAccessObject<UserToken> {
    constructor(driver: IQueryable, tableName: string) {
        super(driver, tableName)
    }

    updateByID() : never {
        throw "plsno"
    }

    async getByID(id: number) : Promise<UserToken> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE ${_fields["idKey"]} = ${id}`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async deleteByID(id: number) : Promise<UserToken> {
        try {
            const sql = `DELETE FROM ${this.tableName} WHERE ${_fields["idKey"]} = ${id} RETURNING *`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }
    
    async getUserTokens(id: number) : Promise<UserToken[]> {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE ${_fields["idUser"]} = ${id}}`
            const rows = await this.driver.query(sql)
            return rows.map(x => this.tryConvert(x))
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async findOne(key: string) : Promise<UserToken> {
        try {
            const sql = `SELECT id FROM ${this.tableName} WHERE ${_fields["key"]} = ${key}`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    async addOne(data: UserToken) {
        try {
            const {idUser, key} = data
            const sql = `INSERT INTO ${this.tableName}(${_fields["idUser"]}, ${_fields["key"]}) VALUES(${idUser}, ${key}) RETURNING *`
            const rows = await this.driver.query(sql)
            return this.tryConvert(rows[0])
        } catch(error) {
            throw new DaoError(error)
        }
    }

    tryConvert(data: object) : UserToken {
        let conversation = {}

        if (data == null)
            return null

        for (const [field, value] of Object.entries(_fields)) {
            conversation[field] = data[value]
        }

        return conversation as UserToken
        
    }
}

