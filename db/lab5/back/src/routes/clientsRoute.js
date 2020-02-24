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

router.put('/:id', async (req, res) => {
    try {
        let client = await Client.updateOne({
            id: req.params.id,
            ...req.query
        })
        res.json({
            success: true,
            id: client.id_client
        })
    } catch(error) {

    }
})

router.post('/', async (req, res) => {
    try {
        let client = await Client.addOne(...req.query)
        res.json({
            success: true,
            id: client.id_client
        })
    } catch(error) {
        
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let client = await Client.deleteOne(req.params.id)
        res.json({
            success: true,
            phonenumber: client.phonenumber
        })

    } catch(error) {

    }
})

module.exports = router