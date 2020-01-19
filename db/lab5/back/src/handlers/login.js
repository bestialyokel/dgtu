const pool = require('../db/pool')
const crypto = require('crypto')
const {Router} = require('express')


const router = new Router()


router.get('/', async (req, res) => {
    let {key} = req.query
    try {
        let query = {
            text: 'SELECT iduser, role FROM Logins WHERE key=$1',
            values: [key]
        }
        let check = await pool.query(query)
        if (check.rows.length == 0) 
            res.json({
                success: false,
                msg: 'key not valid'
            })
        else 
            res.json({
                success: true,
                iduser: check.rows[0].iduser,
                role: check.rows[0].role
            })
    } finally {
        //pool.release()
    }

})

router.post('/', async (req, res) => {
    let {login, password} = req.query
    try {
        let query = {
            text: 'SELECT * FROM Users WHERE login=$1 AND password=$2',
            values: [login, password]
        }
        let signin = await pool.query(query)
        let user = signin.rows[0]
        if (user == null) {
            res.json({
                success: false,
                msg: 'not valid'
            })
            return
        }
        let key = await crypto.randomBytes(16).toString('hex')
        query = {
            text: 'INSERT INTO Logins VALUES (DEFAULT, $1, $2, $3)',
            values: [user.iduser, key, user.role]
        }
        await pool.query(query)
        res.json({
            success: true,
            key: key,
            role: user.role
        })
    } finally {
        //pool.release()
    }
})

router.delete('/', async (req, res) => {
    let {key} = req.query
    try {
        let query = {
            text: 'DELETE FROM Logins WHERE key=$1 RETURNING iduser',
            values: [key]
        }
        let signout = await pool.query(query)
        res.json({
            success: true,
            iduser: signout.rows[0] == null ? null : signout.rows[0].iduser
        })
    } finally {
        //pool.release()
    }
})

module.exports = router