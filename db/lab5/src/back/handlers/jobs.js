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
            let job = await db.query("SELECT * FROM Jobs WHERE idjob=$1", [id])

            let workers = await db.query('SELECT idworker from Workers WHERE idjob=$1', [id])

            if (job.rows.length == 0) {
                res.json({
                    success: false,
                    message: 'job not found'
                })
                return
            }


            res.json({
                success: true,
                message: 'tariff and services available',
                job: job.rows[0],
                workers: workers.rows,
                fields: job.fields.map(x => x.name)
            })
            return
        }

        let jobs = await db.query('SELECT * FROM Jobs')
        res.status(200).json({
            success: true,
            message: 'tariffs available',
            jobs: jobs.rows,
            fields: jobs.fields.map(x=>x.name)
        });
    }

    if (req.method == 'POST') {
        let {descr, idappeal, status} = req.query

        let create = await db.query('INSERT INTO Jobs VALUES (DEFAULT, $1, $2, $3 RETURNING idjob',
                                    [idappeal, descr, status]      
        )

        res.json({
            success: true,
            message: 'job created',
            idjob: create.rows[0].idjob
        })
    }
    if (req.method == 'PUT') {
        const {id, status} = req.query
        let update = await db.query('UPDATE Jobs SET status=$1 WHERE idjob=$2', [status, id])

        res.json({
            success: true,
            message: 'job updated',
            idjob: id
        })

    }
    if (req.method == 'DELETE') {
        const {id} = req.query
        let del = await db.query('DELETE FROM Jobs WHERE idjob=$1', [id])

        res.json({
            success: true,
            message: 'job deleted'
        })
    }

}