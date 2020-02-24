const pool = require('../db/pool')

let getAll = async () => {
    let sql = 'SELECT id_appeal FROM Appeals'
    let { rows } = await pool.query(sql)
    return rows
}

let getOne = async (id) => {
    let sql = 'SELECT * FROM Appeals WHERE id_appeal=$1'
    let { rows } = await pool.query(sql, [id])
    return rows[0]
}

let updateOne = async ({id, description, status}) => {
    let sql = 'UPDATE Appeals SET description=$1, status=$2 WHERE id_appeal=$3 RETURNING id_appeal'
    let { rows } = await pool.query(sql, [description, status, id])
    return rows[0]
}

let addOne = async ({id_contract, description, status}) => {
    let sql = 'INSERT INTO Appeals VALUES (DEFAULT, $1, $2, $3) RETURNING id_appeal'
    let { rows } = await pool.query(sql, [id_contract, description, status])
    return rows[0]
}

let deleteOne = async (id) => {
    let sql = 'DELETE FROM Appeals WHERE id_appeal=$1 RETURNING id_contract'
    let { rows } = await pool.query(sql, [id])
    return rows[0]
}

let getHistoryByID = async (id) => {
    let sql = 'SELECT * FROM Appeals_tmp WHERE id_appeal=$1'
    let { rows } = await pool.query(sql, [id])
    return rows
}

const Appeal = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
    getHistoryByID,
}

module.exports = Appeal


