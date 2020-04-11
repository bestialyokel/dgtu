const {Model} = require('../models')

class ConversationModel extends Model {
    constructor( obj ) {
        super(obj)
        const {id} = obj
        this._id = id
    }
    get id() {
        return this._id
    }
    set id(value) {
        this._id = value
    }
}

module.exports = ConversationModel