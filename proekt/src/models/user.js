const {Model} = require('../models')

class UserModel extends Model {
    constructor(obj) {
        super(obj)

        const {id, login, password} = obj
        this._id = id
        this._login = login
        this._password = password
    }
    get id() {
        return this._id
    }
    set id(value) {
        this._id = value
    }
    get login() {
        return this._login
    }
    set login(value) {
        this._login = value
    }
    get password() {
        return this._password
    }
    set password(value) {
        this._password = value
    }
}

module.exports = UserModel