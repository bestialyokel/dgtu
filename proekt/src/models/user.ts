import Model from "./model";
import { User } from "../types?";
import { UserDao } from "../daos";


export default class UserModel extends Model<User> {
    constructor(protected dao: UserDao) {
        super(dao)
    }

    tryValidate(data: object): User {
        return this.dao.tryConvert(data)
    }

    async getByID(id: number) : Promise<User> {
        return await this.dao.getByID(id)
    }

    async addOne(data: object) : Promise<User> {
        const user = this.tryValidate(data)
        return await this.dao.addOne(user)
    }
    
    async updateByID(id: number, data: object) : Promise<User> {
        const user = this.tryValidate(data)
        return await this.dao.updateByID(id, user)
    }

    async deleteByID(id: number) : Promise<User> {
        return await this.dao.deleteByID(id)
    }
}

