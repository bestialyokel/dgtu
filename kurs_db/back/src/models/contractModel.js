const pool = require('../db/pool')

let getAll = async () => {
    let sql = 'SELECT id_contract FROM Contracts'
    let { rows } = await pool.query(sql)
    return rows
}

let getOne = async (id) => {
    let sql = 'SELECT * FROM Contracts WHERE id_contract=$1'

    let contractReq = await pool.query(sql, [id])
    sql = 'SELECT id_appeal FROM Appeals WHERE id_contract=$1'
    let appealsReq = await pool.query(sql, [id])
    let contract = contractReq.rows[0]
    let appeals = appealsReq.rows.map(x => x.id_appeal)
    return {...contract, appeals}
}

let updateOne = async ({id, id_tariff, address, contract_type}) => {
    let sql = 'UPDATE Contracts SET id_tariff=$1, address=$2, contract_type=$3 WHERE id_contract=$4'
    await pool.query(sql, [id_tariff, address, contract_type, id])
}

let addOne = async ({id_client, id_tariff, address, contract_type}) => {
    let sql = 'INSERT INTO Contracts VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id_contract'
    let { rows } = await pool.query(sql, [id_client, id_tariff, address, contract_type])
    return rows[0]
}

let deleteOne = async (id) => {
    let sql = 'DELETE FROM Contracts WHERE id_contract=$1'
    await pool.query(sql, [id])
}

let getHistoryByID = async (id) => {
    let sql = 'SELECT * FROM Contracts_tmp WHERE id_contract=$1'
    let { rows } = await pool.query(sql, [id])
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


