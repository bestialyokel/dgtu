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
    let query = {
        text: 'SELECT * FROM Clients_tmp WHERE id_service=$1',
        values: [id]
    }
    let {rows} = await pool.query(query)
    query = {
        text: 'SELECT id_contract, MAX(create_date) \
                FROM Contracts_tmp \
                WHERE id_client = $1 and create_date <= $2'
    }
    return rows
}


let rollBackOne = async (id, toDate) => {
    let query = {
        text: 'SELECT id_client, name, surname, patronymic, phone_number \
                FROM Clients_tmp \
                WHERE id_client = $1 AND create_date <= $2 \
                ORDER BY create_date DESC \
                LIMIT 1',
        values: [id, toDate] 
    }
    let record = await pool.query(query)
    if (record.rowCount == 0) {
        await pool.query('DELETE FROM Tariffs WHERE id_tariff=$1', [id])
        return
    }
    let client = record.rows[0]
    query = {
        text: 'UPDATE Clients SET \
                    name = $1, \
                    surname = $2 \
                    patronymic = $3 \
                    phone_number = $4 \
                WHERE id_client = $5 RETURNING id_client',
        values: [client.name, client.surname, client.patronymic, client.phone_number, id]
    }
    let update = await pool.query(query)
    if (update.rowCount == 0) {
        query = {
            text: 'INSERT INTO Clients(id_client, name, surname, patronymic, phone_number) VALUES ($1,$2,$3,$4,$5)',
            values: [service.name, service.description, id]
        }
        await pool.query(query)
    }
    let tspairs = await pool.query(query)
    await pool.query('DELETE FROM TSpairs WHERE id_tariff=$1', [id])
    tspairs.forEach(pair => {
        pool.query('INSERT INTO TSPairs VALUES ($1,$2)', [id, x.id_service])
    })
    return
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


