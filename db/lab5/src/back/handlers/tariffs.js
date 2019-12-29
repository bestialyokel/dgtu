const db = require('../db/db')
const privileges = require('../privileges')

module.exports = async (req, res, next) => {
    const {key} = req.query
    let login = await db.query('SELECT * FROM Logins WHERE key=$1', [key])
    login = login.rows[0]
    if (login == null) {
        res.status(401).json({
            success: false,
            message: 'not logged in'
        })
        return
    }
    delete key

    if (!privileges['tariffs'][req.method].includes(login.role)) {
        res.status(403).json({
            success: false,
            message: 'not privileged'
        })
        return
    }

    if (req.method == 'GET') {
        let {id} = req.query

        if (id) {
            let tariff = await db.query("SELECT * FROM Tariffs WHERE idtariff=$1", [id])

            if (tariff.rows.length == 0) {
                res.json({
                    success: false,
                    message: 'tariff not found'
                })
                return
            }

            let services = await db.query('SELECT * FROM Tariffsdeps WHERE idtariff=$1', [id])

            res.json({
                success: true,
                message: 'tariff and services available',
                tariff: tariff.rows[0],
                fields: tariff.fields.map(x => x.name),
                services: services.rows.map(x => x.idservice)
            })
            return
        }

        let tariffs = await db.query('SELECT * FROM Tariffs')
        res.status(200).json({
            success: true,
            message: 'tariffs available',
            tariffs: tariffs.rows,
            fields: tariffs.fields.map(x=>x.name)
        });
    }
    if (req.method == 'POST') {

        const {name, payment, period, services} = req.query
        let createTariff = 'WITH tariff AS (INSERT INTO Tariffs VALUES (DEFAULT, $1, $2, $3) RETURNING idtariff)'
        let idtariff = '(SELECT idtariff FROM tariff)';
        let createDependencies = 'INSERT INTO Tdeps VALUES ' + services.split(',').map((idservice,i) => `(${idtariff}, $${i+4})`) + 'RETURNING idtariff'
        let create = await db.query(createTariff+createDependencies, [name, payment, period, ...services.split(',')])
        res.status(200).json({
            success: true,
            message: 'tariff created',
            idtariff: create.rows[0].idtariff
        });
    }
    if (req.method == 'PUT') {

        const {id, name, payment, period, services} = req.query

        let query = String()
        let args = [name, payment, period, id]
        
        if (services != null) {
            query = 'WITH tariff AS (UPDATE Tariffs SET name=$1, payment=$2, period=$3 WHERE idtariff=$4), \
                    plug AS (INSERT INTO Tdeps VALUES ' + 
                            services.split(',').map((x,i) => `($4, $${i+5})`) + ')' +
                    'DELETE FROM Tdeps WHERE idtariff=$4'

            args = [args, ...services.split(',')]
        } else {
            query = 'UPDATE Tariffs SET NAME=$1, payment=$2, period=$3 WHERE idtariff=$4'
        }

        let update = await db.query(query, args)
        res.status(200).json({
            success: true,
            message: 'tariff updated',
            idtariff: id
        });
    }
    if (req.method == 'DELETE') {

        const {id} = req.query
        let del = await db.query('DELETE FROM Tariffs WHERE idtariff=$1', [id]);
        res.status(200).json({
            success: true,
            message: 'tariff deleted'
        })
    }
}
