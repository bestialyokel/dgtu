const pool = require('../db/pool')

let getAll = async () => {
    let sql = 'SELECT id_worker FROM Workers'
    let { rows } = await pool.query(sql)
    return rows
}

let getOne = async (id) => {
    let sql = 'SELECT * FROM Workers WHERE id_worker=$1'
    let { rows } = await pool.query(sql, [id])
    return rows[0]
}

let updateOne = async ({id, id_job, skills}) => {
    let sql = 'UPDATE Workers SET id_job=$1, skills=$2 WHERE id_worker=$3'
    await pool.query(sql, [id_job, skills, id])
}

let addOne = async ({name, surname, patronymic, id_job, skills}) => {
    let sql = 'INSERT INTO Workers VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING id_worker'
    let { rows } = await pool.query(sql, [name, surname, patronymic, id_job, skills])
    return rows[0]
}

let deleteOne = async (id) => {
    let sql = 'DELETE FROM Workers WHERE id_worker=$1'
    await pool.query(sql, [id])
}

let getHistoryByID = async (id) => {
    let sql = 'SELECT * FROM Workers_tmp WHERE id_worker=$1'
    let { rows } = await pool.query(sql, [id])
    return rows
}

const Worker = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
    getHistoryByID,
}

module.exports = Worker


