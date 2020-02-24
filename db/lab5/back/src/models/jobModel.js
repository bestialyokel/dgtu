const pool = require('../db/pool')

let getAll = async () => {
    let sql = 'SELECT id_job FROM Jobs'
    let { rows } = await pool.query(sql)
    return rows
}

let getOne = async (id) => {
    let sql = 'SELECT * FROM Jobs WHERE id_job=$1'
    let { rows } = await pool.query(sql, [id])
    return rows[0]
}

let updateOne = async ({id, description, status}) => {
    let sql = 'UPDATE Jobs SET description=$1, status=$2 WHERE id_job=$3 RETURNING id_job'
    let { rows } = await pool.query(sql, [description, status, id])
    return rows[0]
}

let addOne = async ({id_appeal, description, status}) => {
    let sql = 'INSERT INTO Jobs VALUES (DEFAULT, $1, $2, $3) RETURNING id_job'
    let { rows } = await pool.query(sql, [id_appeal, description, status])
    return rows[0]
}

let deleteOne = async (id) => {
    let sql = 'DELETE FROM Jobs WHERE id_job=$1 RETURNING id_appeal'
    let { rows } = await pool.query(sql, [id])
    return rows[0]
}

let getHistoryByID = async (id) => {
    let sql = 'SELECT * FROM Jobs_tmp WHERE id_job=$1'
    let { rows } = await pool.query(sql, [id])
    return rows
}

const Job = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
    getHistoryByID,
}

module.exports = Job


