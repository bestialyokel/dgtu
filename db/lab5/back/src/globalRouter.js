
const {Router} = require('express')


const policyRoute = require('./policy/policyRoute')
const loginRoute = require('./routes/loginRoute')
const clientsRoute = require('./routes/clientsRoute')
const contractsRoute = require('./routes/contractsRoute')
const appealsRoute = require('./routes/appealsRoute')
const servicesRoute = require('./routes/servicesRoute')
const tariffsRoute = require('./routes/tariffsRoute')
const jobsRoute = require('./routes/jobsRoute')
const workersRoute = require('./routes/workersRoute')


const router = new Router()


router.use(policyRoute)

router.use('/login', loginRoute)
router.use('/clients', clientsRoute)
router.use('/contracts', contractsRoute)
router.use('/appeals', appealsRoute)
router.use('/services', servicesRoute)
router.use('/tariffs', tariffsRoute)
router.use('/jobs', jobsRoute)
router.use('/workers', workersRoute)


module.exports = router