const db = require('../db/db')
const crypto = require('crypto')

module.exports = async (req, res, next) => {

    if (req.method == 'POST') {
        const {login, password} = req.query
        let query = `SELECT * FROM Users AS U WHERE U.login=$1 AND U.password=$2`
        let user = await db.query(query, [login, password])
        user = user.rows[0]
        if (user == null) {
            res.status(400).json({
                success: false,
                message: 'login and password combination are not valid'
            })
            return
        }
        delete login, password
        const key = await crypto.randomBytes(16).toString('hex') 
        query = 'INSERT INTO Logins VALUES (DEFAULT, $1, $2, $3)'
        await db.query(query, [user.iduser, key, user.role])
        res.status(201).json({
            success: true,
            message: 'logged in',
            key: key,
            login: user.login,
            role: user.role
        })
        return
    }
    if (req.method == 'DELETE') {
        const {key} = req.query
        let query = 'DELETE FROM Logins WHERE key=$1'
        let result = await db.query(query, [key])
        delete key
        if (result.rowCount = 0) {

            res.status(400).json({
                success: false,
                message: 'not logged in'
            })

        } else {
            
            res.status(200).json({
                success: true,
                message: 'logged out'
            })

        }
        return
    }

    res.status(400).json({
        success: false,
        message: 'use POST or DELETE'
    })
}