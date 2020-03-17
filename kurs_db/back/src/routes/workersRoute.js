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

router.get('/history/:id', async (req, res) => {
    try {
        res.json({
            success: true,
            history: await Worker.getHistoryByID(req.params.id)
        })
    } catch(error) {

    }
})

router.put('/:id', async (req, res) => {
    try {
        const {id_job, name, surname, patronymic, skills} = req.query 
        let worker = await Worker.updateOne({id: req.params.id, id_job, name, surname, patronymic, skills})
        res.json({
            success: true,
        })
    } catch(error) {

    }
})

router.post('/', async (req, res) => {
    try {
        const {id_job, name, surname, patronymic, skills} = req.query 
        let worker = await Worker.addOne({id_job, name, surname, patronymic, skills})
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
        })

    } catch(error) {

    }
})

module.exports = router