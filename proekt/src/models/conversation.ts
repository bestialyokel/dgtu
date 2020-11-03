import Model from "./model"
import { ConversationDAO } from "../daos"
import { Conversation } from "../types?"
import { ValidationError } from "../errors"


export default class ConversationModel extends Model<Conversation> {
    constructor(protected dao: ConversationDAO) {
        super(dao)
    }

    tryValidate(data: object) : Conversation {
        let conversation = this.dao.tryConvert(data)
        return conversation
    }

    async getByID(id: number) : Promise<Conversation> {
        return await this.dao.getByID(id)
    }

    async addOne(data: object) : Promise<Conversation> {
        const conversation = this.tryValidate(data)
        return await this.dao.addOne(conversation)
    }
    
    async updateByID(id: number, data: object) : Promise<Conversation> {
        const conversation = this.tryValidate(data)
        return await this.dao.updateByID(id, conversation)
    }

    async deleteByID(id: number) : Promise<Conversation> {
        return await this.dao.deleteByID(id)
    }
}