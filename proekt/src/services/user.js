//@ts-check

const {ResourceNotFoundError, InternalError, ValidationError} = require('../errors')

/* Ошибки можно сделать информативнее */
class UserService {
    constructor(userModel, userConversationPairModel, userTokenModel) {
        this.userTokenModel = userTokenModel
        this.userModel = userModel
        this.userConversationPairModel = userConversationPairModel
    }

    async getUser(idUser) {}

    async createUser(data) {}

    async deleteUser(idUser) {}

    async updateUser(idUser, data) {}

    async getUsersConversations(idUser) {}

    async addToken(idUser, data) {}
    async dropToken(idUser, data) {}
    async getUserTokens(idUser, data) {}


}

module.exports = UserService