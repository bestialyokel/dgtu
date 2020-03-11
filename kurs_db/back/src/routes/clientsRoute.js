const {Router} = require('express')
const Client = require('../models/clientModel')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let clients = await Client.getAll()
        res.json({
            success: true,
            clients: clients.map(x => x.id_client)
        })
    } catch(error) {

    }
})

router.get('/:id', async (req, res) => {
    try {
        let client = await Client.getOne(req.params.id)
        res.json({
            success: true,
            client
        })
    } catch(error) {

    }
})

router.get('/history/:id', async (req, res) => {
    try {
        res.json({
            success: true,
            history: await Client.getHistoryByID(req.params.id)
        })
    } catch(error) {

    }
})

router.put('/:id', async (req, res) => {
    try {
        let client = await Client.updateOne({id: req.params.id, ...req.query})
        res.json({
            success: true,
        })
    } catch(error) {

    }
})

router.post('/', async (req, res) => {
    try {
        let {id_client} = await Client.addOne(...req.query)
        res.json({
            success: true,
            id: id_client
        })
    } catch(error) {
        
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let client = await Client.deleteOne(req.params.id)
        res.json({
            success: true,
        })

    } catch(error) {

    }
})

module.exports = router