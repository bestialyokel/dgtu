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
    let sql = 'SELECT * FROM Contracts_tmp WHERE id_contract=$1'
    let {rows} = await pool.query(sql, [id])
    return rows
}

const Contract = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
    getHistoryByID,
}

module.exports = Contract


