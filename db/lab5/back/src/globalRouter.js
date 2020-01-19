//global router deps.
const {Router} = require('express')

//policies
const policyHandler = require('./policyHandler')


//routes handlers
const loginHandler = require('./handlers/login')
const clientsHandler = require('./handlers/clients')
const contractsHandler = require('./handlers/contracts')
const appealsHandler = require('./handlers/appeals')
const servicesHandler = require('./handlers/services')
const tariffsHandler = require('./handlers/tariffs')
const jobsHandler = require('./handlers/jobs')
const workersHandler = require('./handlers/workers')


const router = new Router()

//access checking
router.use(policyHandler)


router.use('/login', loginHandler)
router.use('/clients', clientsHandler)
router.use('/contracts', contractsHandler)
router.use('/appeals', appealsHandler)
router.use('/services', servicesHandler)
router.use('/tariffs', tariffsHandler)
router.use('/jobs', jobsHandler)
router.use('/workers', workersHandler)

module.exports = router