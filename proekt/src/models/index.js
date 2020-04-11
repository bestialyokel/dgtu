const {DataAccessObject} = require('../daos') 

class Model {
    constructor() {
        if (!(dataAccessObject instanceof DataAccessObject))
            throw "Model requires DAO"
    }
}

module.exports = {Model}

const UserModel = require('./user')
const MessageModel = require('./message')
const UserTokenModel = require('./userToken')
const UserConversationPairModel = require('./userConversationPair')
const ConversationModel = require('./conversation')

module.exports = {
    ...module.exports,
    UserConversationPairModel, 
    UserModel, 
    UserTokenModel, 
    MessageModel,
    ConversationModel,
    
}
