import Model from "./model";
import { User } from "../types?";
import { UserDao } from "../daos";


export default class UserModel extends Model<User> {
    constructor(private dao: UserDao) {
        super()
    }

    /* Дописать наследников Exception для обработки ошибок, функцию валидации */
    tryValidate(data: object): User {
        let user = this.dao.tryConvert(data)
        return user
    }

    async getOne(id: number) : Promise<User> {
        return await this.dao.getOne(id)
    }

    async addOne(id: number, data: object) : Promise<User> {
        const user = this.tryValidate(data)
        return await this.dao.addOne(user)
    }
    
    async updateOne(id: number, data: object) : Promise<User> {
        const user = this.tryValidate(data)
        return await this.dao.updateOne(id, user)
    }

    async deleteOne(id: number) : Promise<User> {
        return await this.dao.deleteOne(id)
    }
}

