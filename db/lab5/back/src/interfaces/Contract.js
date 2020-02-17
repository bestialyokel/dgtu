const pool = require('../../db/pool')

let getAll = async () => {
    let query = {
        text: 'SELECT id_contract FROM Contracts',
        values: []
    }
    let req = await pool.query(query)
    return req.rows
}

let getOne = async (id) => {
    let query = {
        text: 'SELECT * FROM Contracts WHERE id_contract=$1',
        values: [id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let updateOne = async ({id, id_tariff, address, type}) => {
    let query = {
        text: 'UPDATE Contracts SET id_tariff=$1, address=$2, type=$3 WHERE id_contract=$4 RETURNING id_contract',
        values: [id_tariff, address, type, id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let addOne = async ({id_client, id_tariff, address, type}) => {
    let query = {
        text: 'INSERT INTO Contracts VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id_contract',
        values: [id_client, id_tariff, address, type]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let deleteOne = async (id) => {
    let query = {
        text: 'DELETE FROM Contracts WHERE id_contract=$1 RETURNING id_client',
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
    let sql = 'SELECT id_contract, name, payment, period \
                FROM Contracts_tmp \
                WHERE id_contract = $1 AND create_date <= $2 \
                ORDER BY create_date DESC \
                LIMIT 1'
    let record = await pool.query(sql, [id, toDate])
    if (record.rowCount == 0) {
        await pool.query('DELETE FROM Contracts WHERE id_contract=$1', [id])
        return record.rows[0]
    }
    let contract = record.rows[0]
    sql =  'UPDATE Contracts SET \
                    name = $1, \
                    payment = $2 \
                    period = $3 \
                WHERE id_contract = $4 RETURNING id_contract'
    let update = await pool.query(query)
    if (update.rowCount == 0) {
        query = {
            text: 'INSERT INTO Contracts(id_contract, name, payment, period) VALUES ($1,$2,$3,$4)',
            values: [contract.name, contract.description, id]
        }
        await pool.query(query)
    }
    return record.rows[0]
}

const Contract = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
    rollBackOne,
}

module.exports = Contract


