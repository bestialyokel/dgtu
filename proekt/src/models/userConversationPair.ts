import Model from "./model";
import { UserConversationPair } from "../types?";
import { UserConversationPairDAO } from "../daos";


export default class UserConversationPairModel extends Model<UserConversationPair> {
    constructor(private dao: UserConversationPairDAO) {
        super()
    }

    /* Дописать наследников Exception для обработки ошибок, функцию валидации */
    tryValidate(data: object) : UserConversationPair {
        const userConversationPair = this.dao.tryConvert(data)
        return userConversationPair
    }
    async addOne(data: object) {
        const userConversationPair = this.dao.tryConvert(data)
        return await this.dao.addOne(userConversationPair)
    }
    async deleteOne(data: object) {
        const userConversationPair = this.dao.tryConvert(data)
        return await this.dao.deleteOne(userConversationPair)
    }

    async getUsersConversations(idUser: number) {
        return await this.dao.getUserConversations(idUser)
    }

    async getConversationUsers(idConversation: number) {
        return await this.dao.getConversationUsers(idConversation)
    }
    
}
