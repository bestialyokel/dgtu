import {IUserService} from './'
import { UserModel, UserTokenModel } from '../models';
import { User, UserToken } from '../types?';
import { ResourceNotFoundError } from '../errors';

class UserTestService implements IUserService {
    constructor(private userModel: UserModel,
                private userTokenModel: UserTokenModel) {}

    async getOne(id: number = 1) : Promise<User> {
        const result = await this.userModel.getByID(id)
        if (result == null)
            throw new ResourceNotFoundError(`user ${id} not found`)

        return result
    }

    async createOne(data: object = {}) : Promise<User> {
        return await this.userModel.addOne(data)
    }

    async deleteOne(id: number = 2) : Promise<User> {
        const result = await this.userModel.deleteByID(id)
        if (result == null)
            throw new ResourceNotFoundError(`user ${id} not found`)
        
        return result
    }

    async addLogin(data: object = {}) : Promise<UserToken> {
        return await this.userTokenModel.addOne(data)
    }

    async updateOne(id: number = 1, data: object = {}) : Promise<User> {
        const user = await this.userModel.getByID(id)
        if (user == null)
            throw new ResourceNotFoundError(`user ${id} not found`)

        return await this.userModel.updateByID(id, data);
    }

    async findLogin(key: string = '') : Promise<UserToken> {
        const result = await this.userTokenModel.findOne(key)
        if (result == null)
            throw new ResourceNotFoundError(`login/token/yahz ${key} not found`)

        return result
    }

    async removeLogin(id: number = 4) : Promise<UserToken> {
        const result = await this.userTokenModel.deleteByID(id)
        if (result == null)
            throw new ResourceNotFoundError(`login/token/yahz ${id} not found`)

        return result
    }
}

export default UserTestService