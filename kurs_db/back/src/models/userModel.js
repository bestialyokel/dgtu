const pool = require('../db/pool')

let getOne = async (login) => {
    let sql = 'SELECT * FROM Users WHERE login=$1'
    let { rows } = await pool.query(sql, [login])
    return rows[0]
}

const User = {
    getOne
}

module.exports = User