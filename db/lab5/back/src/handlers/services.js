const {Router} = require('express')
const Service = require('../interfaces/Service')


const router = new Router()


router.get('/', async (req, res) => {
    try {
        let services = await Service.getAll()
        res.json({
            success: true,
            services: services.map(x => x.id_service)
        })
    } catch(error) {

    }
})

router.get('/:id', async (req, res) => {
    try {
        let service = await Service.getOne(req.params.id)
        res.json({
            success: true,
            service
        })
    } catch(error) {

    }
})

router.put('/:id', async (req, res) => {
    try {
        let service = await Service.updateOne({
            id: req.params.id,
            ...req.query
        })
        res.json({
            success: true,
            id: service.id_service
        })
    } catch(error) {

    }
})

router.post('/', async (req, res) => {
    try {
        let service = await Service.addOne(...req.query)
        res.json({
            success: true,
            id: service.id_service
        })
    } catch (error) {
        
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let service = await Service.deleteOne(req.params.id)
        res.json({
            success: true,
            name: service.name
        })

    } catch(error) {

    }
})

module.exports = router