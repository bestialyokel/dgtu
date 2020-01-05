const pool = require('../db/pool')
const {Router} = require('express')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let query = {
            text: 'SELECT idclient FROM Clients',
        }
        let get = await pool.query(query)
        res.json({
            success: true,
            clients: get.rows
        })

    } finally {
        //pool.release()
    }
})

router.get('/:id', async (req, res) => {
    try {
        let query = {
            text: 'SELECT * FROM Clients WHERE idclient=$1',
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
            client: get.rows[0]
        })

    } finally {
        //pool.release()
    }
})

router.put('/:id', async (req, res) => {
    try {
        let {name, surname, patronymic, phonenumber} = req.query
        let query = {
            text: 'UPDATE Clients SET name=$1, surname=$2, patronymic=$3, phonenumber=$4 WHERE idclient=$5 RETURNING idclient',
            values: [name, surname, patronymic, phonenumber, req.params.id]
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
            id: put.rows[0].idclient
        })
    } finally {
        //pool.release()
    }
})

router.post('/', async (req, res) => {
    try {
        let {name, surname, patronymic, phonenumber} = req.query
        let query = {
            text: 'INSERT INTO Clients VALUES (DEFAULT, $1, $2, $3, $4) RETURNING idclient',
            values: [name, surname, patronymic, phonenumber]
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
            id: post.rows[0].idclient
        })
    } finally {
        //pool.release()
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        let query = {
            text: 'DELETE FROM Clients WHERE idclient=$1 RETURNING phonenumber',
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
            phonenumber: remove.rows[0].phonenumber
        })

    } finally {
        //pool.release()
    }
})

module.exports = router