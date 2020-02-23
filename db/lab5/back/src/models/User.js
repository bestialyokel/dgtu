const pool = require('../../db/pool')

let getUser = async (login) => {
    let query = {
        text: 'SELECT * FROM Users WHERE login=$1',
        values: [login]
    }
    let req = await pool.query(query)
    return req.rows[0]
}



const User = {
    getUser
}

module.exports = User