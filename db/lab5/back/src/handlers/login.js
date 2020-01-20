const {Router} = require('express')
const crypto = require('crypto')
const User = require('../interfaces/User')
const Login = require('../interfaces/Login')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let {key} = req.query
        let login = await Login.getLogin(key)
        if (login == null) {
            res.json({
                success: false,
                msg: 'key not valid'
            })
            return
        }
        let user = await User.getUser(login.login)
        res.json({
            success: true,
            user
        })
    } catch(error) {
        res.json({
            success: false
        })
    }
})

router.post('/', async (req, res) => {
    try {
        let {login, password} = req.query
        let user = await User.getUser(login)
        if (user == null || user.password != password) {
            res.json({
                success: false,
                msg: 'wrong login+password'
            })
            return
        }
        let key = await crypto.randomBytes(8).toString('hex')
        let loginReq = await Login.addLogin({
            login: user.login,
            key
        })
        res.json({
            success: true,
            key: loginReq.key
        })
        
        
    } catch(error) {
        console.log(error)
        res.json({
            success: false
        })
    }
})

router.delete('/', async (req, res) => {
    try {
        let {key} = req.query
        let logout = Login.deleteLogin(key)
        let login = logout.login
        res.json({
            success: !!login,
            login
        })
        
    } catch(error) {
        res.json({
            success: false
        })
    
    }
})

module.exports = router