import {DaoError} from '../errors'

import {IQueryable} from '../types?'


export default abstract class DataAccessObject<T> {
    constructor(protected driver: IQueryable, 
                protected tableName: string) {

    }
    /*
        А если id по-разному называется
    */

    abstract tryConvert(data: object) : T

    abstract getByID(id: number) : Promise<T>
    abstract deleteByID(id: number) : Promise<any>
    abstract addOne(data: T) : Promise<any>
    abstract updateByID(id: number, data: T) : Promise<any>
}