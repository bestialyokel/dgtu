const pool = require('../db/pool')

let getAll = async () => {
    let sql = 'SELECT id_tariff FROM Tariffs'
    let { rows } = await pool.query(sql)
    return rows
}

let getOne = async (id) => {
    let sql = 'SELECT * FROM Tariffs WHERE id_tariff=$1'
    let { rows } = await pool.query(sql, [id])
    if (rows.length == 0) 
        return rows[0]
    sql = 'SELECT id_service FROM TSPairs WHERE id_tariff=$1'
    let tariff = rows[0]
    let servicesReq = await pool.query(sql, [id])
    return {
        ...tariff,
        services: servicesReq.rows.map(x => x.id_service)
    }
}

let updateOne = async ({id, name, description, period, payment, services}) => {
    let sql = 'UPDATE Tariffs SET name=$1,period=$2, payment=$3 WHERE id_tariff=$4'
    await pool.query(sql, [name, period, payment, id])
    await pool.query('DELETE FROM TSPairs WHERE id_tariff=$1', [id])

    services = services.split(',')

    if (services)
        services.filter(x => !isNaN(x)).forEach(
            x => pool.query('INSERT INTO TSPairs VALUES ($1, $2)', 
                                                        [id, x]) )
}

let addOne = async ({name, period, payment, services}) => {
    let sql = 'INSERT INTO Tariffs VALUES (DEFAULT, $1, $2, $3) RETURNING id_tariff'
    let { rows } = await pool.query(sql, [name, payment, period])

    if (services) 
        services.filter(x => !isNaN(x)).forEach(
            x => pool.query('INSERT INTO TSPairs VALUES ($1, $2)', 
                                                        [id, x]) )
    return rows[0]
}

let deleteOne = async (id) => {
    let sql = 'DELETE FROM Tariff WHERE id_tariff=$1'
    await pool.query(sql, [id])
}


let getHistoryByID = async (id) => {
    let sql = 'SELECT * FROM Tariffs_tmp WHERE id_tariff=$1'
    let { rows } = await pool.query(sql, [id])
    return rows
}

const Tariff = {
    getAll,
    getOne,
    updateOne,
    addOne,
    deleteOne,
    getHistoryByID,
}

module.exports = Tariff


