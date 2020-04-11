class DataAccessObject {
    constructor(driver, tableName) {
        if (!driver.query) 
            throw "Queries not available"

        if (Object.getPrototypeOf(tableName) == String.prototype) {
            throw "tableName should be string"
        }

        this.driver = driver
        this.tableName = tableName

        if (Object.getPrototypeOf(this) == Model.prototype) 
            throw "Abstract class"

    }
}

module.exports = {DataAccessObject}

const UserDAO = require('./user')
const MessageDAO = require('./message')
const UserTokenDAO = require('./userToken')
const UserConversationPairDAO = require('./userConversationPair')
const ConversationDAO = require('./conversation')

module.exports = {
    ...module.exports,
    UserConversationPairDAO, 
    UserDAO, 
    UserTokenDAO, 
    MessageDAO,
    ConversationDAO,
    
}
