const {Router} = require('express')
const Worker = require('../models/workerModel')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let workers = await Worker.getAll()
        res.json({
            success: true,
            workers: workers.map(x => x.id_worker)
        })
    } catch(error) {

    }
})

router.get('/:id', async (req, res) => {
    try {
        let worker = await Worker.getOne(req.params.id)
        res.json({
            success: true,
            worker
        })
    } catch(error) {

    }
})

router.put('/:id', async (req, res) => {
    try {
        let worker = await Worker.updateOne({
            id: req.params.id,
            ...req.query
        })
        res.json({
            success: true,
            id: worker.id_worker
        })
    } catch(error) {

    }
})

router.post('/', async (req, res) => {
    try {
        let worker = await Worker.addOne(...req.query)
        res.json({
            success: true,
            id: worker.id_worker
        })
    } catch (error) {
        
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let worker = await Worker.deleteOne(req.params.id)
        res.json({
            success: true,
            id_worker: worker.id_worker
        })

    } catch(error) {

    }
})

module.exports = router