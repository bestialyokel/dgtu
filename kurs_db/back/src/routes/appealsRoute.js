const {Router} = require('express')
const Appeal = require('../models/appealModel')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let appeals = await Appeal.getAll()
        res.json({
            success: true,
            appeals: appeals.map(x => x.id_appeal)
        })
    } catch(error) {

    }
})

router.get('/:id', async (req, res) => {
    try {
        let appeal = await Appeal.getOne(req.params.id)
        res.json({
            success: true,
            appeal
        })
    } catch(error) {

    }
})

router.get('/history/:id', async (req, res) => {
    try {
        res.json({
            success: true,
            history: await Appeal.getHistoryByID(req.params.id)
        })
    } catch(error) {

    }
})

router.put('/:id', async (req, res) => {
    const {id_contract, description, status}  = req.query
    try {
        let appeal = await Appeal.updateOne({id: req.params.id, id_contract, description, status} )
        res.json({
            success: true,
        })
    } catch(error) {

    }
})

router.post('/', async (req, res) => {
    try {
        let {id_appeal} = await Appeal.addOne(req.query)
        res.json({
            success: true,
            id: id_appeal
        })
    } catch(error) {
        
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let appeal = await Appeal.deleteOne(req.params.id)
        res.json({
            success: true,
        })

    } catch(error) {

    }
})

module.exports = router