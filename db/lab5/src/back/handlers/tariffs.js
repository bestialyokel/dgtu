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

        let tariffs = await db.query('SELECT * FROM Tariffs T, Tariffsdeps D, Services S WHERE T.idtariff=D.idtariff AND D.idservice=S.idservice')
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
        let createDependencies = 'INSERT INTO Tariffsdeps VALUES ' + services.split(',').map((idservice,i) => `(${idtariff}, $${i+4})`) + 'RETURNING idtariff'
        let create = await db.query(createTariff+createDependencies, [name, payment, period, ...services.split(',')])
        res.status(200).json({
            success: true,
            message: 'tariff created',
            idtariff: create.rows[0].idtariff
        });
    }
    if (req.method == 'PUT') {

        const {id, name, payment, period, services} = req.query

        let query = 'WITH tariff AS (UPDATE Tariffs SET name=$1, payment=$2, period=$3 WHERE idtariff=$4), \
                    plug AS (INSERT INTO Tariffsdeps VALUES ' + 
                            services.split(',').map((x,i) => `($4, $${i+5})`) + ')' +
                    'DELETE FROM Tariffsdeps WHERE idtariff=$4'

        let update = await db.query(query, [name, payment, period, id, ...services.split(',')])
        res.status(200).json({
            success: true,
            message: 'tariff updated',
            idtariff: id
        });
    }
    if (req.method == 'DELETE') {

        const {id} = req.query
        
        let query = 'WITH plug AS (DELETE FROM Tariffs WHERE idtariff=$1) \
                     DELETE FROM Tariffsdeps WHERE idtariff=$1'
        let del = await db.query(query, [id]);
        res.status(200).json({
            success: true,
            message: 'tariff deleted'
        })
    }
}
