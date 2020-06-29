import Model from "./model";
import { UserToken } from "../types?";
import { UserTokenDAO } from "../daos";


export default class UserTokenModel extends Model<UserToken> {
    constructor(protected dao: UserTokenDAO) {
        super(dao)
    }

    /* Дописать наследников Exception для обработки ошибок, функцию валидации */
    tryValidate(data: object) {
        const userToken = this.dao.tryConvert(data)
        return userToken
    }
    
    updateByID(id: never) : never {
        throw 0;
    }

    async findOne(key: string) {
        return await this.dao.findOne(key)
    } 

    async getByID(id: number) {
        return await this.dao.getByID(id)
    }

    async addOne(data: object) {
        const userToken = this.dao.tryConvert(data)
        return await this.dao.addOne(userToken)
    }

    async deleteByID(id: number) {
        return await this.dao.deleteByID(id)
    }

}
