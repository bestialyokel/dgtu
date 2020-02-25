const {Router} = require('express')
const Contract = require('../models/contractModel')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let contracts = await Contract.getAll()
        res.json({
            success: true,
            contracts: contracts.map(x => x.id_contract)
        })
    } catch(error) {

    }
})

router.get('/:id', async (req, res) => {
    try {
        let contract = await Contract.getOne(req.params.id)
        res.json({
            success: true,
            contract
        })
    } catch(error) {

    }
})


router.get('/history/:id', async (req, res) => {
    try {
        res.json({
            success: true,
            history: await Contract.getHistoryByID(req.params.id)
        })
    } catch(error) {

    }
})

router.put('/:id', async (req, res) => {
    try {
        let contract = await Contract.updateOne({
            id: req.params.id,
            ...req.query
        })
        res.json({
            success: true,
            id: contract.id_contract
        })
    } catch(error) {

    }
})

router.post('/', async (req, res) => {
    try {
        let contract = await Contract.addOne(...req.query)
        res.json({
            success: true,
            id: contract.id_contract
        })
    } catch (error) {
        
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let contract = await Contract.deleteOne(req.params.id)
        res.json({
            success: true,
            id_client: contract.id_client
        })

    } catch(error) {

    }
})

module.exports = router