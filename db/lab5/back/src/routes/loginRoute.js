const {Router} = require('express')
const crypto = require('crypto')
const User = require('../models/userModel')
const Token = require('../models/tokenModel')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let {key} = req.query
        let token = await Token.getOne(key)
        if (token == null) {
            res.json({
                success: false,
                msg: 'key not valid'
            })
            return
        }
        let user = await User.getUser(token.login)
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
        let tokenReq = await Token.addOne({
            login: user.login,
            key
        })
        res.json({
            success: true,
            key: tokenReq.key
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