
class ConversationService {

    constructor(conversationModel, userModel, userConversationPairModel) {
        this.conversationModel = conversationModel
        this.userModel = userModel
        this.userConversationPairModel = userConversationPairModel
    }

    async getConversation(idConversation) {
        const conversation = await this.conversationModel.getOne(idConversation)

        if (conversation == null) {
            const query = {idConversation}
            throw new ResourceNotFoundError(`conversation:id${idConversation}`, query)
        }

        return conversation

    }

    async createConversation(data) {
        const conversation = await this.conversationModel.addOne(data)

        if (conversation == null) {
            throw new Error("unexpected behavior")
        }

        return conversation
    }

    async updateConversation(idConversation, data) {
        const conversation = await this.conversationModel.getOne(idConversation)

        if (conversation == null) {
            const query = {idConversation}
            throw new ResourceNotFoundError(`conversation:id${idConversation}`, query)
        }

        const updatedConversation = await this.conversationModel.updateOne(idConversation, data)

        if (updatedConversation == null) {
            throw new Error("unexpected behavior")
        }

        return updatedConversation
    }





    async deleteConversation(idConversation) {
        const conversation = await this.conversationModel.getOne(idConversation)

        if (conversation == null) {
            const query = {idConversation}
            throw new ResourceNotFoundError(`conversation:id${idConversation}`, query)
        }

        const deletedConversation = await this.conversationModel.deleteOne(idConversation)

        if (deletedConversation == null) {
            throw new Error("unexpected behavior")
        }

        return deletedConversation
    }




    async getConversationUsers(idConversation) {
        const conversation = await this.conversationModel.getOne(idConversation)

        if (conversation == null) {
            const query = {idConversation}
            throw new ResourceNotFoundError(`conversation:id${idConversation}`, query)
        }

        const conversationUsers = await this.userConversationPairModel.getConversationUsers(idConversation)
        return conversationUsers.map(user => user.id_user)
    }




    async addUser(idConversation, idUser) {
        const conversation = await this.conversationModel.getOne(idConversation)
    
        if (conversation == null) {
            const query = {idConversation}
            throw new ResourceNotFoundError(`conversation:id${idConversation}`, query)
        }

        const user = await this.userModel.getOne(idUser)

        if (user == null) {
            const query = {idUser}
            throw new ResourceNotFoundError(`user:id${idUser}`, query)
        }

        const conversationUsers = await this.userConversationPairModel.getConversationUsers(idConversation)

        if (conversationUsers.find(user => user.id_user == idUser)) {
            const query = {idUser, idConversation}
            throw new LogicalError(`user:id${idUser} already in conversation:id${idConversation}`, query)
        } 

        const userConversationPair = this.userConversationPairModel.addOne({idUser, idConversation})

        if (userConversationPair == null) {
            throw new Error("unexpected behavior")
        }

        return userConversationPair
    }




    async removeUser(idConversation, idUser) {
        const conversation = await this.conversationModel.getOne(idConversation)
    
        if (conversation == null) {
            const query = {idConversation}
            throw new ResourceNotFoundError(`conversation:id${idConversation}`, query)
        }

        const user = await this.userModel.getOne(idUser)

        if (user == null) {
            const query = {idUser}
            throw new ResourceNotFoundError(`user:id${idUser}`, query)
        }

        const conversationUsers = await this.userConversationPairModel.getConversationUsers(idConversation)

        if (conversationUsers.find(user => user.id_user == idUser) == null) {
            const query = {idUser, idConversation}
            throw new ResourceNotFoundError(`user:id${idUser} entry into conversation:id${idConversation}`, query)
        }

        const userConversationPair = this.userConversationPairModel.deleteOne({idUser, idConversation})

        if (userConversationPair == null) {
            throw new Error("unexpected behavior")
        }

        return userConversationPair
    }
}

module.exports = ConversationService