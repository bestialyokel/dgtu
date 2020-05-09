const {Router} = require('express')
const {makeDump, makeRestore} = require('../dump/dump')

const fs = require('fs')

const router = new Router()


let config = {
    host: 'localhost',
    port: 5432,
    dbname: 'provider',
    username: 'ddbachur',
}

router.get('/', async (req, res) => {
    try {
        let dumps = fs.readdirSync('./dumps')
        res.json(dumps)
    } catch(error) {

    }
})

router.post('/', async (req, res) => {
    try {
        let x = makeDump({...config, dumpDestination: `./dumps/db_${new Date().toISOString()}.dump`})
        res.json({status: "ok"})
    } catch(error) {
        res.json({status: false})
    }
})

router.put('/:serial', async (req, res) => {
    let serial = req.params.serial
    try {
        let dumps = fs.readdirSync('./dumps');
        let x = makeRestore({...config, dumpSource: `./dumps/${dumps[serial]}`})
        res.json({status: "ok"})
    } catch(error) {
        res.json({status: false})
    }
})

module.exports = router