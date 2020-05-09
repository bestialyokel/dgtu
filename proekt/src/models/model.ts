import DataAccessObject from "../daos/dao";

export default abstract class Model<T> {
    constructor() {
    }

    abstract tryValidate(data: object): T

    //ya hz
}