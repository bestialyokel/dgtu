const pool = require('../../db/pool')
const TSPairs = require('./TSPairs')

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
    return {...tariffReq.rows[0], 
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


let getHistoryByID = async (id) => {
    let sql = 'SELECT * FROM Services_tmp WHERE id_service=$1'
    let {rows} = await pool.query(sql, [id])
    // существующие услуги на каждом коммите* в тарифе
    sql = 'SELECT TSPTmp.id_tariff, TSPTmp.id_service, MAX(TSPTmp.create_date) \
                FROM TSPairs_tmp AS TSPTmp, Services AS S \
                WHERE TSPTmp.id_tariff = $1 AND TSPTmp.id_service=S.id_service AND create_date <= $2 \
                GROUP BY TSPTmp.id_tariff, TSPTmp.id_service'
    rows = await Promise.all(rows.map(
        async (x) => {
            let servicesReq = await pool.query(sql, [id, x.create_date])
            let services = servicesReq.rows.map(x => (
                {
                    id_tariff: x.id_tariff, 
                    id_service: x.id_service
                }
        ))
        return {...x, services: services}
        }
    ))
    return rows
}


let rollBackOne = async (id, toDate) => {
    let sql = 'SELECT * \
                FROM Tariffs_tmp \
                WHERE id_tariff = $1 AND create_date <= $2 \
                ORDER BY create_date DESC \
                LIMIT 1'
    let record = await pool.query(sql, [id, toDate])
    if (record.rowCount == 0) {
        await pool.query('DELETE FROM Tariffs WHERE id_tariff=$1', [id])
        return record.rows[0]
    }
    let tariff = record.rows[0]
    sql = 'UPDATE Tariffs SET \
                    name = $1, \
                    payment = $2 \
                    period = $3 \
                WHERE id_tariff = $4 RETURNING id_tariff'
    let update = await pool.query(sql, [tariff.name, tariff.payment, tariff.period, id])
    if (update.rowCount == 0) {
        sql = 'INSERT INTO Tariffs(id_tariff, name, payment, period) VALUES ($1,$2,$3,$4)',
        await pool.query(sql, [id, tariff.name, tariff.payment, tariff.period])
    } else {
        await pool.query('DELETE FROM TSpairs WHERE id_tariff=$1', [id])
    }
    let services = await TSPairs.getHistoryServices(record)
    services.forEach(s => {
        pool.query('INSERT INTO TSPairs VALUES ($1,$2)', [id, s])
    })
    return record.rows[0]
}

const Tariff = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
    getHistoryByID,
    rollBackOne,
}

module.exports = Tariff


