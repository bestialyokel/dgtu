const pool = require('../db/pool')

let getAll = async () => {
    let sql = 'SELECT id_service FROM Services'
    let { rows } = await pool.query(sql)
    return rows
}

let getOne = async (id) => {
    let sql = 'SELECT * FROM Services WHERE id_service=$1'
    let { rows } = await pool.query(sql, [id])
    return rows[0]
}

let updateOne = async ({id, name, description}) => {
    let sql = 'UPDATE Services SET name=$1, description=$2 WHERE id_service=$3 RETURNING id_service'
    let { rows } = await pool.query(sql, [name, description, id])
    return rows[0]
}

let addOne = async ({name, description}) => {
    let sql = 'INSERT INTO Services VALUES (DEFAULT, $1, $2) RETURNING id_service'
    let { rows } = await pool.query(sql, [name, description])
    return rows[0]
}

let deleteOne = async (id) => {
    let sql = 'DELETE FROM Services WHERE id_service=$1 RETURNING name'
    let { rows } = await pool.query(sql, [id])
    return rows[0]
}

let getHistoryByID = async (id) => {
    let sql = 'SELECT * FROM Services_tmp WHERE id_service=$1'
    let { rows } = await pool.query(sql, [id])
    return rows
}

const Service = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
    getHistoryByID,
}

module.exports = Service


