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
            let service = await db.query('SELECT * FROM Services WHERE idservice=$1', [id])

            if (service.rows.length == 0) {
                res.status(200).json({
                    success: false,
                    message: 'service not found'
                })
                return
            }
            res.status(200).json({
                success: true,
                message: 'service available',
                service: service.rows[0]
            })
            return
        }

        let services = await db.query('SELECT * FROM Services')
        services = services.rows
        res.status(200).json({
            success: true,
            message: 'services available',
            services: services,
            fields: services.fields
        })
        return
    }
    if (req.method == 'POST') {

        const {name} = req.query
        let insert = await db.query('INSERT INTO Services VALUES (DEFAULT, $1) RETURNING idservice', [name])
        if (insert.rowCount == 0) {
            res.status(500).json({
                success: false,
                message: 'does not exist'
            })
            return
        }
        res.status(200).json({
            success: true,
            message: 'service created',
            idservice: insert.rows[0].idservice
        })
        return
    }
    if (req.method == 'PUT') {

        const {id, name} = req.query
        let update = await db.query('UPDATE Services SET s_name=$1 WHERE idservice=$2 RETURNING idservice', [name, id])
        if (update.rowCount == 0) {
            res.status(500).json({
                success: false,
                message: 'does not exist'
            })
            return
        }
        res.status(200).json({
            success: true,
            message: 'service updated',
            idservice: update.row[0].idservice
        })
        return
    }
    if (req.method == 'DELETE') {

        const {id} = req.query
        let del = await db.query('DELETE FROM Services WHERE idservice=$1 RETURNING idservice', [id])
        if (del.rowCount == 0) {
            res.status(500).json({
                success: false,
                message: 'does not exist'
            })
            return
        }
        await db.query('DELETE FROM Tariffsdeps WHERE idservice=$1', [id])
        res.status(200).json({
            success: true,
            message: 'service removed',
            name: update.row[0].name
        })
        return
    }
}