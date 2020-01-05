const pool = require('../db/pool')
const {Router} = require('express')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let query = {
            text: 'SELECT idcontract FROM Contracts',
        }
        let get = await pool.query(query)
        res.json({
            success: true,
            contracts: get.rows
        })

    } finally {
        //pool.release()
    }
})

router.get('/:id', async (req, res) => {
    try {
        let query = {
            text: 'SELECT * FROM Contracts WHERE idcontract=$1',
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
            contract: get.rows[0]
        })

    } finally {
        //pool.release()
    }
})

router.put('/:id', async (req, res) => {
    try {
        let {idtariff} = req.query
        let query = {
            text: 'UPDATE Contracts SET idtariff=$1 WHERE idcontract=$2 RETURNING idcontract',
            values: [idtariff, req.params.id]
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
            id: put.rows[0].idcontract
        })
    } finally {
        //pool.release()
    }
})

router.post('/', async (req, res) => {
    try {
        let {idclient, idtariff, address, type} = req.query
        let query = {
            text: 'INSERT INTO Contracts VALUES (DEFAULT, $1, $2, $3, $4) RETURNING idcontract',
            values: [idclient, idtariff, address, type]
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
            id: post.rows[0].idcontract
        })
    } finally {
        //pool.release()
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        let query = {
            text: 'DELETE FROM Contracts WHERE idcontract=$1 RETURNING idclient',
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
            client: remove.rows[0].idclient
        })

    } finally {
        //pool.release()
    }
})

module.exports = router