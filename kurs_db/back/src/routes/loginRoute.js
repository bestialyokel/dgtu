const {Router} = require('express')
const crypto = require('crypto')
const User = require('../models/userModel')
const Token = require('../models/tokenModel')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let { key } = req.query
        let { login } = await Token.getOne(key) || {}
        if (login == void(0)) 
            res.json({
                success: false,
                msg: 'key not valid'
            })
        let { role } = await User.getOne(login)
        res.json({
            success: true,
            user: {login, role}
        })
    } catch(error) {
    }
})

router.post('/', async (req, res) => {
    try {
        let {login, password} = req.query
        let user = await User.getOne(login)
        if (user == void(0) || user.password != password)
            res.json({
                success: false,
                msg: 'wrong login+password'
            })


        let key = await crypto.randomBytes(8).toString('hex')
        await Token.addOne({
            login: login,
            key
        })
        res.json({
            success: true,
            key: key
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
        let { key } = req.query
        await Token.deleteOne(key)
        res.json({
            success: true,
        })
        
    } catch(error) {
        res.json({
            success: false
        })
    
    }
})

module.exports = router