const pool = require('../../db/pool')

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

const Client = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
}

module.exports = Client


