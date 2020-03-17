const {Router} = require('express')
const Tariff = require('../models/tariffModel')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let tariffs = await Tariff.getAll()
        res.json({
            success: true,
            tariffs: tariffs.map(x => x.id_tariff)
        })
    } catch(error) {

    }
})

router.get('/:id', async (req, res) => {
    try {
        let tariff = await Tariff.getOne(req.params.id)
        res.json({
            success: true,
            tariff
        })
    } catch(error) {

    }
})

router.get('/history/:id', async (req, res) => {
    try {
        res.json({
            success: true,
            history: await Tariff.getHistoryByID(req.params.id)
        })
    } catch(error) {

    }
})

router.put('/:id', async (req, res) => {
    try {
        const {name, payment, period, services} = req.query 
        let tariff = await Tariff.updateOne({id: req.params.id, name, payment, period, services})
        res.json({
            success: true,
        })
    } catch(error) {

    }
})

router.post('/', async (req, res) => {
    try {
        const {name, payment, period, services} = req.query 
        let tariff = await Tariff.addOne({name, payment, period, services})
        res.json({
            success: true,
            id: tariff.id_tariff
        })
    } catch (error) {
        
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let tariff = await Tariff.deleteOne(req.params.id)
        res.json({
            success: true,
        })

    } catch(error) {

    }
})

module.exports = router