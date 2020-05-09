import Model from "./model"
import { MessageDAO } from "../daos"
import { Message } from "../types?"

export default class MessageModel extends Model<Message> {
    constructor(private dao: MessageDAO) {
        super()
    }

    tryValidate(data: object) : Message {
        let message = this.dao.tryConvert(data)
        return message
    }

    async getOne(id: number) : Promise<Message> {
        return await this.dao.getOne(id)
    }

    async addOne(data: Object) : Promise<Message> {
        const message = this.tryValidate(data)
        return await this.dao.addOne(message)
    }
    
    async updateOne(id: number, data: Object) : Promise<Message> {
        const message = this.tryValidate(data)
        return await this.dao.updateOne(id, message)
    }

    async deleteOne(id: number) : Promise<Message> {
        return await this.dao.deleteOne(id)
    }
}

