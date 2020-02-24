const pool = require('../db/pool')

let getOne = async (key) => {
    let sql = 'SELECT login FROM Tokens WHERE key=$1'
    let { rows } = await pool.query(sql, [key])
    return rows[0]
}

let addOne = async ({login, key}) => {
    let sql = 'INSERT INTO Tokens VALUES ($1, $2) RETURNING key'
    let { rows } = await pool.query(sql, [login, key])
    return rows[0]
}

let deleteOne = async (key) => {
    let sql = 'DELETE FROM Tokens WHERE key=$1 RETURNING login'
    let { rows } = await pool.query(sql, [key])
    return rows[0]
}

const Login = {
    getOne,
    addOne,
    deleteOne
}

module.exports = Login


