const pool = require('../../db/pool')

let getAll = async () => {
    let query = {
        text: 'SELECT id_job FROM Jobs',
        values: []
    }
    let req = await pool.query(query)
    return req.rows
}

let getOne = async (id) => {
    let query = {
        text: 'SELECT * FROM Jobs WHERE id_job=$1',
        values: [id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let updateOne = async ({id, description, status}) => {
    let query = {
        text: 'UPDATE Jobs SET description=$1, status=$2 WHERE id_job=$3 RETURNING id_job',
        values: [description, status, id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let addOne = async ({id_appeal, description, status}) => {
    let query = {
        text: 'INSERT INTO Jobs VALUES (DEFAULT, $1, $2, $3) RETURNING id_job',
        values: [id_appeal, description, status]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let deleteOne = async (id) => {
    let query = {
        text: 'DELETE FROM Jobs WHERE id_job=$1 RETURNING id_appeal',
        values: [id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let getHistoryByID = async (id) => {
    let sql = 'SELECT * FROM Jobs_tmp WHERE id_job=$1'
    let {rows} = await pool.query(sql, [id])
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


