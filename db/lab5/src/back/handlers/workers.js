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

    if (!privileges['contracts'][req.method].includes(login.role)) {
        res.status(403).json({
            success: false,
            message: 'not privileged'
        })
        return
    }

    if (req.method == 'GET') {
        let {id} = req.query

        if (id) {
            let worker = await db.query("SELECT * FROM Workers WHERE idworker=$1", [id])

            if (worker.rows.length == 0) {
                res.json({
                    success: false,
                    message: 'worker not found'
                })
                return
            }


            res.json({
                success: true,
                message: 'worker and job available',
                worker: tariff.rows[0],
                fields: tariff.fields.map(x => x.name),
                services: services.rows.map(x => x.idservice)
            })
            return
        }


    }
    if (req.method == 'POST') {}
    if (req.method == 'PUT') {}
    if (req.method == 'DELETE') {}

}