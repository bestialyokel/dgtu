const pool = require('../../db/pool')
const Contract = require('./Contract')

let getAll = async () => {
    let query = {
        text: 'SELECT id_client FROM Clients',
        values: []
    }
    let req = await pool.query(query)
    return req.rows
}

let getOne = async (id) => {
    let query = {
        text: 'SELECT * FROM Clients WHERE id_client=$1',
        values: [id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let updateOne = async ({id, name, surname, patronymic, phonenumber}) => {
    let query = {
        text: 'UPDATE Clients SET name=$1, surname=$2, patronymic=$3, phonenumber=$4 WHERE id_client=$5 RETURNING id_client',
        values: [name, surname, patronymic, phonenumber, id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let addOne = async ({name, surname, patronymic, phonenumber}) => {
    let query = {
        text: 'INSERT INTO Clients VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id_client',
        values: [name, surname, patronymic, phonenumber]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let deleteOne = async (id) => {
    let query = {
        text: 'DELETE FROM Clients WHERE id_client=$1 RETURNING phonenumber',
        values: [id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let getHistoryByID = async (id) => {
    let sql = 'SELECT * FROM Clients_tmp WHERE id_client=$1'
    let {rows} = await pool.query(sql, [id])
    return rows
}


let rollBackOne = async (id, toDate) => {
    let sql = 'SELECT id_client, name, surname, patronymic, phone_number \
                FROM Clients_tmp \
                WHERE id_client = $1 AND create_date <= $2 \
                ORDER BY create_date DESC \
                LIMIT 1'
    let record = await pool.query(sql, [id, toDate])
    if (record.rowCount == 0) {
        await pool.query('DELETE FROM Clients WHERE id_client=$1', [id])
        return record.rows[0]
    }
    let client = record.rows[0]
    sql =  'UPDATE Clients SET \
                    name = $1, \
                    surname = $2 \
                    patronymic = $3 \
                    phone_number = $4 \
                WHERE id_client = $5 RETURNING id_client'
    let update = await pool.query(query)
    if (update.rowCount == 0) {
        sql = 'INSERT INTO Clients(id_client, name, surname, patronymic, phone_number) VALUES ($1,$2,$3,$4,$5)'
        await pool.query(sql, [.name, service.description, id])
    }
    return record.rows[0]
}

const Client = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
    rollBackOne,
}

module.exports = Client


