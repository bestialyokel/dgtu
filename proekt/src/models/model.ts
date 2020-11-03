import DataAccessObject from "../daos/dao";

export default abstract class Model<T> {
    constructor(protected dao: DataAccessObject<T>) {
    }

    abstract tryValidate(data: object): T 

    abstract getByID(id: number) : Promise<T> 
    abstract addOne(data: T) : Promise<T>
    abstract deleteByID(id: number) : Promise<T>
    abstract updateByID(id: number, data: T) : Promise<T>
    

    //ya hz
}