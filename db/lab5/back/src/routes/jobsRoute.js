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

router.put('/:id', async (req, res) => {
    try {
        let job = await Job.updateOne({
            id: req.params.id,
            ...req.query
        })
        res.json({
            success: true,
            id: job.id_job
        })
    } catch(error) {

    }
})

router.post('/', async (req, res) => {
    try {
        let job = await Job.addOne(...req.query)
        res.json({
            success: true,
            id: job.id_job
        })
    } catch (error) {
        
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let job = await Job.deleteOne(req.params.id)
        res.json({
            success: true,
            id_appeal: job.id_appeal
        })

    } catch(error) {

    }
})

module.exports = router