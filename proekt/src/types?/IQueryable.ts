import { QueryResult } from "pg";

export default interface IQueryable {
    query(sql: string) : Promise<object[]>;
    queryDetailed(sql: string) : Promise<QueryResult | any>;
}