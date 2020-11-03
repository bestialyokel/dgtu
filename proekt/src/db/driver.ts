import {Pool, QueryResult} from 'pg'

import {IQueryable} from '../types?'

class DB implements IQueryable {
    private static _pool: Pool;
    private pool: Pool;
    private static instance: DB;

    private constructor() {
        this.pool = DB._pool
    }

    static init(pool: Pool) {
        DB._pool = pool
    }

    static getInstance() : DB {
        if (DB.instance)
            return DB.instance
        if (DB._pool) {
            DB.instance = new DB()
            return DB.instance
        } else {
            throw new Error("init with pool before pls");
        }
    }

    async queryDetailed(sql: string) : Promise<QueryResult | any>  {
        return await this.pool.query(sql)
    }
    async query(sql: string) : Promise<object[]> {
        const {rows} = await this.pool.query(sql)
        return rows
    }
}

const pool = new Pool({
    user: "ddbachur",
    host: "localhost",
    database: "messages",
    password: "g3mfcq4f",
    port: 5432
})

DB.init(pool)

export default DB
