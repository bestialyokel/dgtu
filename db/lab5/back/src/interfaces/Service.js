const pool = require('../../db/pool')

let getAll = async () => {
    let query = {
        text: 'SELECT id_service FROM Services',
        values: []
    }
    let req = await pool.query(query)
    return req.rows
}

let getOne = async (id) => {
    let query = {
        text: 'SELECT * FROM Services WHERE id_service=$1',
        values: [id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let updateOne = async ({id, name, description}) => {
    let query = {
        text: 'UPDATE Services SET name=$1, description=$2 WHERE id_service=$3 RETURNING id_service',
        values: [name, description, id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let addOne = async ({name, description}) => {
    let query = {
        text: 'INSERT INTO Services VALUES (DEFAULT, $1, $2) RETURNING id_service',
        values: [name, description]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let deleteOne = async (id) => {
    let query = {
        text: 'DELETE FROM Services WHERE id_service=$1 RETURNING name',
        values: [id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

const Service = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
}

module.exports = Service


