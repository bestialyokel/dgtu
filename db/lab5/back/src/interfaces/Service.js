const pool = require('../../db/pool')

let getAll = async () => {
    let query = {
        text: 'SELECT id_service FROM Services',
        values: []
    }
    let { rows } = await pool.query(query)
    return rows
}

let getOne = async (id) => {
    let query = {
        text: 'SELECT * FROM Services WHERE id_service=$1',
        values: [id]
    }
    let { rows } = await pool.query(query)
    return rows
}

let updateOne = async ({id, name, description}) => {
    let query = {
        text: 'UPDATE Services SET name=$1, description=$2 WHERE id_service=$3 RETURNING id_service',
        values: [name, description, id]
    }
    let { rows } = await pool.query(query)
    return rows
}

let addOne = async ({name, description}) => {
    let query = {
        text: 'INSERT INTO Services VALUES (DEFAULT, $1, $2) RETURNING id_service',
        values: [name, description]
    }
    let { rows } = await pool.query(query)
    return rows
}

let deleteOne = async (id) => {
    let query = {
        text: 'DELETE FROM Services WHERE id_service=$1 RETURNING name',
        values: [id]
    }
    let { rows } = await pool.query(query)
    return rows
}

let getHistoryByID = async (id) => {
    let query = {
        text: 'SELECT * FROM Services_tmp WHERE id_service=$1',
        values: [id]
    }
    let {rows} = await pool.query(query)
    return rows
}

let rollBackOne = async (id, toDate) => {
    let query = {
        text: 'SELECT id_service, name, description \
                FROM Services_tmp \
                WHERE id_service = $1 AND create_date <= $2 \
                ORDER BY create_date DESC \
                LIMIT 1',
        values: [id, toDate] 
    }
    let record = await pool.query(query)
    if (record.rowCount == 0) {
        await pool.query('DELETE FROM Services WHERE id_service=$1', [id])
        return
    }
    let service = record.rows[0]
    query = {
        text: 'UPDATE Services SET \
                    name = $1, \
                    description = $2 \
                WHERE id_service = $3 RETURNING id_service',
        values: [service.name, service.description, id]
    }
    let update = await pool.query(query)
    if (update.rowCount == 0) {
        query = {
            text: 'INSERT INTO Services(id_service, name, description) VALUES ($1,$2,$3)',
            values: [id, service.name, service.description]
        }
        await pool.query(query)
    }
    return
}

const Service = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
    rollBackOne,
    getHistoryByID,
}

module.exports = Service


