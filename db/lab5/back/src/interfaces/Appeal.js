const pool = require('../../db/pool')

let getAll = async () => {
    let query = {
        text: 'SELECT id_appeal FROM Appeals',
        values: []
    }
    let req = await pool.query(query)
    return req.rows
}

let getOne = async (id) => {
    let query = {
        text: 'SELECT * FROM Appeals WHERE id_appeal=$1',
        values: [id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let updateOne = async ({id, description, status}) => {
    let query = {
        text: 'UPDATE Appeals SET description=$1, status=$2 WHERE id_appeal=$3 RETURNING id_appeal',
        values: [description, status, id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let addOne = async ({id_contract, description, status}) => {
    let query = {
        text: 'INSERT INTO Appeals VALUES (DEFAULT, $1, $2, $3) RETURNING id_appeal',
        values: [id_contract, description, status]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let deleteOne = async (id) => {
    let query = {
        text: 'DELETE FROM Appeals WHERE id_appeal=$1 RETURNING id_contract',
        values: [id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let rollBackOne = async (id, toDate) => {
    // call & get result
    let query = {
        text: 'SELECT * FROM ROLLBACK_APPEAL($1,$2)',
        values: [id, toDate]
    }
    let req = await pool.query(query)
    return req.rows 
}

const Appeal = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
    rollBackOne,
}

module.exports = Appeal


