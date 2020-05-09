import {Pool} from 'pg'
import {DaoError} from '../errors'

export default abstract class DataAccessObject<T> {

    constructor(protected driver: Pool, 
                protected tableName: string) {

    }
    /*
        А если id по-разному называется
    */

    abstract tryConvert(data: object) : T
}