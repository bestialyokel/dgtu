const {Model} = require('../models')

class UserTokenModel extends Model {
    constructor( obj ) {
        super(obj)
        const {id_user, key} = obj
        this._id_user = id_user
        this._key = key

    }
    get idUser() {
        return this._id_user
    }
    set idUser(value) {
        this._id_user = value
    }
    get key() {
        return this._key
    }
    set key(value) {
        this._key = value
    }
}

module.exports = UserTokenModel