const pool = require('../db/pool')
const {Router} = require('express')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let query = {
            text: 'SELECT idworker FROM Workers',
        }
        let get = await pool.query(query)
        res.json({
            success: true,
            workers: get.rows
        })

    } finally {
        //pool.release()
    }
})

router.get('/:id', async (req, res) => {
    try {
        let query = {
            text: 'SELECT * FROM Workers WHERE idworker=$1',
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

        res.json({
            success: true,
            worker: get.rows[0]
        })

    } finally {
        //pool.release()
    }
})

router.put('/:id', async (req, res) => {
    try {
        let {idjob, name, surname, patronymic, qual} = req.query
        if (isNaN(idjob)) idjob = null
        let query = {
            text: 'UPDATE Workers SET idjob=$1, name=$2, surname=$3, patronymic=$4, qual=$5 WHERE idworker=$6 RETURNING idworker',
            values: [idjob, name, surname, patronymic, qual, req.params.id]
        }
        let put = await pool.query(query)
        if (put.rows.length == 0) {
            res.json({
                success: false,
                msg: 'not found'
            })
            return
        }
        res.json({
            success: true,
            id: put.rows[0].idworker
        })
    } finally {
        //pool.release()
    }
})

router.post('/', async (req, res) => {
    try {
        let {idjob, name, surname, patronymic, qual} = req.query
        let query = {
            text: 'INSERT INTO Workers VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING idworker',
            values: [idjob, name, surname, patronymic, qual]
        }
        let post = await pool.query(query)
        if (post.rows.length == 0) {
            res.json({
                success: false,
                msg: 'not found'
            })
            return
        }
        res.json({
            success: true,
            id: post.rows[0].idworker
        })
    } finally {
        //pool.release()
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        let query = {
            text: 'DELETE FROM Workers WHERE idworker=$1 RETURNING idworker',
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
            client: remove.rows[0].idworker
        })

    } finally {
        //pool.release()
    }
})

module.exports = router