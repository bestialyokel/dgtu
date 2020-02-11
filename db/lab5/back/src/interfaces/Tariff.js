const pool = require('../../db/pool')

let getAll = async () => {
    let query = {
        text: 'SELECT id_tariff FROM Tariffs',
        values: []
    }
    let req = await pool.query(query)
    return req.rows
}

let getOne = async (id) => {
    let query = {
        text: 'SELECT * FROM Tariffs WHERE id_tariff=$1',
        values: [id]
    }
    let tariffReq = await pool.query(query)
    query = {
        text:' SELECT id_service FROM TSPairs WHERE id_tariff=$1',
        values: [id]
    }
    let servicesReq = await pool.query(query)
    return {
        tariff: tariffReq.rows[0],
        services: servicesReq.rows[0]
    }
}

let updateOne = async ({id, name, description, period, payment, services}) => {
    let query = {
        text: 'UPDATE Tariffs SET name=$1, description=$2, period=$3, payment=$4 WHERE id_tariff=$5 RETURNING id_tariff',
        values: [name, description, period, payment, id]
    }
    let update = await pool.query(query)
    query = {
        text: 'DELETE FROM TSPairs WHERE id_tariff=$1',
        values: [id]
    }
    let deletion = await pool.query(query)
    services.split(',').filter(x => !isNaN(x)).forEach(x => {
        let query = {
            text: 'INSERT INTO TSPairs VALUES ($1, $2)',
            values: [id, x]
        }
        pool.query(query)//?
    })
    return update.rows[0]
}

let addOne = async ({name, description, period, payment, services}) => {
    let query = {
        text: 'INSERT INTO Tariffs VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id_tariff',
        values: [name, description, period, payment]
    }
    let req = await pool.query(query)
    services.split(',').filter(x => !isNaN(x)).forEach(x => {
        let query = {
            text: 'INSERT INTO TSPairs VALUES ($1, $2)',
            values: [id, x]
        }
        pool.query(query)//?
    })
    return req.rows[0]
}

let deleteOne = async (id) => {
    let query = {
        text: 'DELETE FROM Tariff WHERE id_tariff=$1 RETURNING name',
        values: [id]
    }
    let req = await pool.query(query)
    return req.rows[0]
}

let rollBackOne = async (id, toDate) => {
    // call & get result
    let query = {
        text: 'SELECT * FROM ROLLBACK_TARIFF($1,$2)',
        values: [id, toDate]
    }
    let req = await pool.query(query)
    return req.rows 
}

const Tariff = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
    rollBackOne,
}

module.exports = Tariff


