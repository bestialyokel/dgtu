//@ts-check

const {ResourceNotFoundError, InternalError, ValidationError} = require('../errors')
const {ConversationModel, UserModel, MessageModel} = require('../models')

class MessageService {
    /**
     * 
     * @param {ConversationModel} conversationModel 
     * @param {MessageModel} messageModel 
     * @param {UserModel} userModel 
     */
    constructor(conversationModel, messageModel, userModel) {
        this.conversationModel = conversationModel
        this.userModel = userModel
        this.messageModel = messageModel
    }

    async getMessage(idMessage) {
        const message = await this.messageModel.getOne(idMessage)

        if (message == null) {
            const query = {idMessage}
            throw new ResourceNotFoundError(`message:id${idMessage}`, query)
        }

        return message
    }

    async sendMessage(data) {
        const {idSender, idConversation} = data
        const user = await this.userModel.getOne(idSender)

        if (user == null) {
            const query = {idSender}
            throw new ResourceNotFoundError(`user:id${idSender}`, query)
        }

        const conversation = await this.conversationModel.getOne(idConversation)

        if (conversation == null) {
            const query = {idConversation}
            throw new ResourceNotFoundError(`conversation:id${idSender}`, query)
        }

        const message = await this.messageModel.addOne(data)

        if (message == null) {
            throw new Error("unexpected behavior")
        }

        return message
    }

    async getConversationMessages(idConversation) {
        const conversation = await this.conversationModel.getOne(idConversation)

        if (conversation == null) {
            const query = {idConversation}
            throw new ResourceNotFoundError(`conversation:id${idConversation}`, query)
        }

        const messages = await this.messageModel.getConversationMessages(idConversation)

        return messages
    }

}

module.exports = MessageService