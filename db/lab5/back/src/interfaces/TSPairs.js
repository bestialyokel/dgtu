const pool = require('../../db/pool')


let getHistoryServices = async(tariff_record) => {
    let sql = 'SELECT TSPTmp.id_service, MAX(TSPTmp.create_date) as create_date\
        FROM TSPairs_tmp AS TSPTmp, Services AS S \
        WHERE TSPTmp.id_tariff = $1 AND TSPTmp.id_service=S.id_service AND create_date <= $2 \
        GROUP BY TSPTmp.id_tariff, TSPTmp.id_service'
    let {rows} = await pool.query(sql, [tariff_record.id_tariff, tariff_record.create_date])
    return rows.map(x => x.id_service)
}

const TSPairs = {
    getHistoryServices,
}

module.exports = TSPairs