const pool = require('../db/pool')

let getAll = async () => {
    let sql = 'SELECT id_client FROM Clients'
    let { rows } = await pool.query(sql)
    return rows
}

let getOne = async (id) => {
    let sql = 'SELECT * FROM Clients WHERE id_client=$1'
    let { rows } = await pool.query(sql, [id])
    return rows[0]
}

let updateOne = async ({id, name, surname, patronymic, phone_number}) => {
    let sql = 'UPDATE Clients SET name=$1, surname=$2, patronymic=$3, phone_number=$4 WHERE id_client=$5'
    await pool.query(sql, [name, surname, patronymic, phone_number, id])
}

let addOne = async ({name, surname, patronymic, phone_number}) => {
    let sql = 'INSERT INTO Clients VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id_client'
    let { rows } = await pool.query(sql, [name, surname, patronymic, phone_number])
    return rows[0]
}

let deleteOne = async (id) => {
    let sql = 'DELETE FROM Clients WHERE id_client=$1'
    await pool.query(sql, [id])
}

let getHistoryByID = async (id) => {
    let sql = 'SELECT * FROM Clients_tmp WHERE id_client=$1'
    let { rows } = await pool.query(sql, [id])
    return rows
}

const Client = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
    getHistoryByID,
}

module.exports = Client


