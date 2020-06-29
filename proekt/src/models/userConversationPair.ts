import Model from "./model";
import { UserConversationPair } from "../types?";
import { UserConversationPairDAO } from "../daos";


export default class UserConversationPairModel extends Model<UserConversationPair> {
    constructor(protected dao: UserConversationPairDAO) {
        super(dao)
    }

    getOne(arg: never) : never {
        throw 0;
    }

    updateByID(arg: never) : never {
        throw 0;
    }

    getByID(arg: never) : never {
        throw 0;
    }

    deleteByID(arg: never) : never {
        throw 0;
    }


    /* Дописать наследников Exception для обработки ошибок, функцию валидации */
    tryValidate(data: object) : UserConversationPair {
        const userConversationPair = this.dao.tryConvert(data)
        return userConversationPair
    }
    async addOne(data: object) : Promise<UserConversationPair> {
        const userConversationPair = this.dao.tryConvert(data)
        return await this.dao.addOne(userConversationPair)
    }
    async deleteOne(data: object) : Promise<UserConversationPair> {
        const userConversationPair = this.dao.tryConvert(data)
        return await this.dao.deleteOne(userConversationPair)
    }

    async getUsersConversations(idUser: number) : Promise<UserConversationPair[]> {
        return await this.dao.getUserConversationsIDs(idUser)
    }

    async getConversationUsers(idConversation: number) {
        return await this.dao.getConversationUsersIDs(idConversation)
    }
    
}
