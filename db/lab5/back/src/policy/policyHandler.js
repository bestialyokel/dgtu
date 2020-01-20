const Login = require('../interfaces/Login')
const User = require('../interfaces/User')

//A - account, T - tech, D - dev
const rules = require('./rules.json')

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
        //*parse* top path
        let subject = topPath(req._parsedUrl.pathname)
        if (rules[subject] == null) {
            next()
            return //?
        }
        let {key} = req.query
        let login = Login.getLogin(key)
        if (login == null) {
            res.json({
                success: false,
                msg: 'not valid'
            })
            return
        }
        let user = User.getUser(login.login)
        if (!rules[subject][req.method].includes(user.role)) {
            res.json({
                success: false,
                msg: 'not privileged'
            })
            return
        }
        //ok
        next()
    } catch(err) {

    }
}