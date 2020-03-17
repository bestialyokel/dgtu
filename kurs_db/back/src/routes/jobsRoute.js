const {Router} = require('express')
const Job = require('../models/jobModel')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let jobs = await Job.getAll()
        res.json({
            success: true,
            jobs: jobs.map(x => x.id_job)
        })
    } catch(error) {

    }
})

router.get('/:id', async (req, res) => {
    try {
        let job = await Job.getOne(req.params.id)
        res.json({
            success: true,
            job
        })
    } catch(error) {

    }
})

router.get('/history/:id', async (req, res) => {
    try {
        res.json({
            success: true,
            history: await Job.getHistoryByID(req.params.id)
        })
    } catch(error) {

    }
})

router.put('/:id', async (req, res) => {
    try {
        const {id_appeal, description, status} = req.query 
        let job = await Job.updateOne({id: req.params.id, id_appeal, description, status})
        res.json({
            success: true,
        })
    } catch(error) {

    }
})

router.post('/', async (req, res) => {
    try {
        const {id_appeal, description, status} = req.query 
        let {id_job} = await Job.addOne({id_appeal, description, status})
        res.json({
            success: true,
            id: id_job
        })
    } catch (error) {
        
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let job = await Job.deleteOne(req.params.id)
        res.json({
            success: true,
        })

    } catch(error) {

    }
})

module.exports = router