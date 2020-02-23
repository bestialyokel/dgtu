const pool = require('../../db/pool')

let getAll = async () => {
    let query = {
        text: 'SELECT id_worker FROM Workers',
        values: []
    }
    let req = await pool.query(query)
    return req.rows
}

let getOne = async (id) => {
    let query = {
        text: 'SELECT * FROM Workers WHERE id_worker=$1',
        values: [id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let updateOne = async ({id, id_job, skill}) => {
    let query = {
        text: 'UPDATE Workers SET id_job=$1, skill=$2 WHERE id_worker=$3 RETURNING id_worker',
        values: [id_job, skill, id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let addOne = async ({name, surname, patronymic, id_job, skill}) => {
    let query = {
        text: 'INSERT INTO Workers VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING id_worker',
        values: [name, surname, patronymic, id_job, skill]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let deleteOne = async (id) => {
    let query = {
        text: 'DELETE FROM Workers WHERE id_worker=$1 RETURNING id_worker',
        values: [id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let getHistoryByID = async (id) => {
    let sql = 'SELECT * FROM Workers_tmp WHERE id_worker=$1'
    let {rows} = await pool.query(sql, [id])
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


