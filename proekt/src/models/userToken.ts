import Model from "./model";
import { UserToken } from "../types?";
import { UserTokenDAO } from "../daos";


export default class UserTokenModel extends Model<UserToken> {
    constructor(private dao: UserTokenDAO) {
        super()
    }

    /* Дописать наследников Exception для обработки ошибок, функцию валидации */
    tryValidate(data: object) {
        const userToken = this.dao.tryConvert(data)
        return userToken
    }

    async findOne(key: string) {
        return await this.dao.findOne(key)
    } 

    async getOne(id: number) {
        return await this.dao.getOne(id)
    }

    async addOne(data: object) {
        const userToken = this.dao.tryConvert(data)
        return await this.dao.addOne(userToken)
    }

    async deleteOne(id: number) {
        return await this.dao.deleteOne(id)
    }

}
