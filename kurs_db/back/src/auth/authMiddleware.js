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

let auth = async (req, res, next) => {
    try {
        let subject = topPath(req.path)
        if (rules[subject] == void(0)) {
            res.json("powel nax")
            return
        }
        let { key } = req.query
        let { login } = await Token.getOne(key) || {}
        let { role } = await User.getOne(login) || {}

        if (role != 'x' && !rules[subject][req.method].includes(role))
            res.json(403)
        next()
    } catch(err) {
        // let  { ... } = undefined; vibrosit owikbu
        console.log(err)
        res.json("kakaya-to owibka")
    }
}

auth.unless = require('express-unless')

module.exports = auth
