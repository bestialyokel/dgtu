const {Model} = require('../models')

class UserConversationPairModel extends Model {
    constructor( obj ) {
        super(obj)
        const {id_user, id_conversation} = obj
        this._id_user = id_user
        this._id_conversation = id_conversation

    }
    get idUser() {
        return this._id_user
    }
    set idUser(value) {
        this._id_user = value
    }
    get idConversation() {
        return this._id_conversation
    }
    set idConversation(value) {
        this._id_conversation = value
    }
}

module.exports = UserConversationPairModel