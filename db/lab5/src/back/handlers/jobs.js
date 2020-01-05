const pool = require('../db/pool')
const {Router} = require('express')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let query = {
            text: 'SELECT idjob FROM Jobs',
        }
        let get = await pool.query(query)
        res.json({
            success: true,
            jobs: get.rows
        })

    } finally {
        //pool.release()
    }
})

router.get('/:id', async (req, res) => {
    try {
        let query = {
            text: 'SELECT * FROM Jobs WHERE idjob=$1',
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
            job: get.rows[0]
        })

    } finally {
        //pool.release()
    }
})

router.put('/:id', async (req, res) => {
    try {
        let {descr, status} = req.query
        let query = {
            text: 'UPDATE Jobs SET descr=$1, status=$2 WHERE idjob=$3 RETURNING idjob',
            values: [descr, status, req.params.id]
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
            id: put.rows[0].idjob
        })
    } finally {
        //pool.release()
    }
})

router.post('/', async (req, res) => {
    try {
        let {idappeal, descr, status} = req.query
        let query = {
            text: 'INSERT INTO Jobs VALUES (DEFAULT, $1, $2, $3) RETURNING idjob',
            values: [idappeal, descr, status]
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
            id: post.rows[0].idjob
        })
    } finally {
        //pool.release()
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        let query = {
            text: 'DELETE FROM Jobs WHERE idjob=$1 RETURNING idappeal',
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
            appeal: remove.rows[0].idappeal
        })

    } finally {
        //pool.release()
    }
})

module.exports = router