import Model from "./model"
import { ConversationDAO } from "../daos"
import { Conversation } from "../types?"
import { Connection } from "pg"
import { ValidationError } from "../errors"


export default class ConversationModel extends Model<Conversation> {
    constructor(private dao: ConversationDAO) {
        super()
    }
    tryValidate(data: object) : Conversation {
        let conversation = this.dao.tryConvert(data)
        return conversation
    }

    async getOne(id: number) : Promise<Conversation> {
        return await this.dao.getOne(id)
    }

    async addOne(data: object) : Promise<Conversation> {
        const conversation = this.tryValidate(data)
        return await this.dao.addOne(conversation)
    }
    
    async updateOne(id: number, data: object) : Promise<Conversation> {
        const conversation = this.tryValidate(data)
        return await this.dao.updateOne(id, conversation)
    }

    async deleteOne(id: number) : Promise<Conversation> {
        return await this.dao.deleteOne(id)
    }
}