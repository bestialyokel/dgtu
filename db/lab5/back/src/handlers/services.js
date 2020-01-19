const pool = require('../db/pool')
const {Router} = require('express')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let query = {
            text: 'SELECT idservice FROM Services',
        }
        let get = await pool.query(query)
        res.json({
            success: true,
            services: get.rows
        })

    } finally {
        //pool.release()
    }
})

router.get('/:id', async (req, res) => {
    try {
        let query = {
            text: 'SELECT * FROM Services WHERE idservice=$1',
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
            service: get.rows[0]
        })

    } finally {
        //pool.release()
    }
})

router.put('/:id', async (req, res) => {
    try {
        let {name} = req.query //add description
        let query = {
            text: 'UPDATE Services SET name=$1 WHERE idservice=$2 RETURNING idservice',
            values: [name, req.params.id]
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
            id: put.rows[0].idservice
        })
    } finally {
        //pool.release()
    }
})

router.post('/', async (req, res) => {
    try {
        let {name} = req.query
        let query = {
            text: 'INSERT INTO Services VALUES (DEFAULT, $1) RETURNING idservice',
            values: [name]
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
            id: post.rows[0].idservice
        })
    } finally {
        //pool.release()
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        let query = {
            text: 'DELETE FROM Services WHERE idservice=$1 RETURNING name',
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
            success: true
        })

    } finally {
        //pool.release()
    }
})

module.exports = router