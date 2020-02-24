const Token = require('../models/tokenModel')
const User = require('../models/userModel')

//A - account, T - tech, D - dev, X - vse
const rules = require('./rules.json')


// hz kak luche /service/1 -> service
let topPath = (path) => {
    for (let i = 1; i < path.length; i++) {
        if (path[i] == '/') {
            path = path.slice(0, i)
            break
        }
    }
    return path.slice(1)
}

module.exports = async (req, res, next) => {
    try {
        let subject = topPath(req.path)
        if ( rules[subject] == void(0) ) {
            if (subject != 'login') res.status(404)
            else next()
        }

        let token = Token.getOne(req.query.key)
        console.log(token)
        next()
        
    } catch(err) {

    }
}