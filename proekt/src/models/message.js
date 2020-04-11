const {Model} = require('../models')

class MessageModel extends Model {
    constructor( obj ) {
        super(obj)
        const {id, id_sender, id_conversation, text} = obj
        this._id = id
        this._idSender = id_sender
        this._idConversation = id_conversation
        this._text = text
    }
    get id() {
        return this._id
    }
    set id(value) {
        this._id = value
    }
    get idSender() {
        return this._idSender
    }
    set idSender(value) {
        this._idSender = value
    }
    get idConversation() {
        return this._idConversation
    }
    set idConversation(value) {
        this._idConversation = value
    }
    get text() {
        return this._text
    }
    set text(value) {
        this._text = value
    }
}

module.exports = MessageModel