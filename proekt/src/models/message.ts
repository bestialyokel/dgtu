import Model from "./model"
import { MessageDAO } from "../daos"
import { Message } from "../types?"

export default class MessageModel extends Model<Message> {
    constructor(protected dao: MessageDAO) {
        super(dao)
    }

    tryValidate(data: object) : Message {
        return this.dao.tryConvert(data)
    }

    getByID(id: number) : never {
        throw 0;
    }

    async getConversationMessages(idConversation: number) : Promise<Message[]> {
        return await this.dao.getConversationMessages(idConversation)
    }

    async addOne(data: object) : Promise<Message> {
        const message = this.tryValidate(data)
        return await this.dao.addOne(message)
    }
    
    async updateByID(id: number, data: object) : Promise<Message> {
        const message = this.tryValidate(data)
        return await this.dao.updateByID(id, message)
    }

    async deleteByID(id: number) : Promise<Message> {
        return await this.dao.deleteByID(id)
    }
}

