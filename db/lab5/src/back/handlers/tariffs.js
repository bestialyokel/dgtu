const pool = require('../db/pool')
const {Router} = require('express')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let query = {
            text: 'SELECT idtariff FROM Tariffs',
        }
        let get = await pool.query(query)
        res.json({
            success: true,
            tariffs: get.rows
        })

    } finally {
        //pool.release()
    }
})

router.get('/:id', async (req, res) => {
    try {
        let query = {
            text: 'SELECT * FROM Tariffs WHERE idtariff=$1',
            values: [req.params.id]
        }
        let get = await pool.query(query)

        if (get.rows.length == 0) {
            res.json({
                success: false,
                msg: 'not found'
            })
            return
        }

        query = {
            text: 'SELECT idservice FROM Tdeps WHERE idtariff=$1',
            values: [get.rows[0].idtariff]
        }

        let services = await pool.query(query)

        res.json({
            success: true,
            tariff: get.rows[0],
            services: services.rows
        })

    } finally {
        //pool.release()
    }
})

router.put('/:id', async (req, res) => {
    try {
        let {name, payment, period, services} = req.query //add description
        let query = {
            text: 'UPDATE Tariffs SET name=$1, payment=$2, period=$3 WHERE idtariff=$4 RETURNING idtariff',
            values: [name, payment, period, services, req.params.id]
        }
        let put = await pool.query(query)
        if (put.rows.length == 0) {
            res.json({
                success: false,
                msg: 'not found'
            })
            return
        }

        query = {
            text: 'DELETE FROM Tdeps WHERE idtariff=$1',
            values: [req.params.id]
        }

        await pool.query(query)

        services = services.split(',')

        services.forEach(x => {
            let query = {
                text: 'INSERT INTO Tdeps VALUES ($1, $2)',
                values: [req.params.id, x]
            }
            pool.query(query) //await
        })

        res.json({
            success: true,
            id: put.rows[0].idservice
        })
    } finally {
        //pool.release()
    }
})

router.post('/:id', async (req, res) => {
    try {
        let {name, payment, period, services} = req.query
        let query = {
            text: 'INSERT INTO Tariffs VALUES (DEFAULT, $1, $2, $3) RETURNING idservice',
            values: [name, payment, period]
        }
        let post = await pool.query(query)
        if (post.rows.length == 0) {
            res.json({
                success: false,
                msg: 'not found'
            })
            return
        }

        services = services.split(',')

        services.forEach(x => {
            let query = {
                text: 'INSERT INTO Tdeps VALUES ($1, $2)',
                values: [post.rows[0].idtariff, x]
            }
            pool.query(query) //await
        })

        res.json({
            success: true,
            id: post.rows[0].idservice
        })
    } finally {
        //pool.release()
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        let query = {
            text: 'DELETE FROM Tariffs WHERE idtariff=$1 RETURNING name',
            values: [req.params.id]
        }
        let remove = await pool.query(query)

        if (remove.rows.length == 0) {
            res.json({
                success: false,
                msg: 'not found'
            })
            return
        }

        res.json({
            success: true,
            name: remove.rows[0].name
        })

    } finally {
        //pool.release()
    }
})

module.exports = router