const pool = require('../../db/pool')

let getLogin = async (key) => {
    let query = {
        text: 'SELECT login FROM Logins WHERE key=$1',
        values: [key]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let addLogin = async ({login, key}) => {
    let query = {
        text: 'INSERT INTO Logins VALUES ($1, $2) RETURNING key',
        values: [login, key]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let deleteLogin = async (key) => {
    let query = {
        text: 'DELETE FROM Logins WHERE key=$1 RETURNING login',
        values: [key]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

const Login = {
    getLogin,
    addLogin,
    deleteLogin
}

module.exports = Login


