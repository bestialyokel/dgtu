//global router deps.
const {Router} = require('express')


const policyHandler = require('./policyHandler')


//routes handlers
const loginHandler = require('./handlers/login')
const clientsHandler = require('./handlers/clients')


const router = new Router()

//access checking
router.use(policyHandler)


router.use('/login', loginHandler)
router.use('/clients', clientsHandler)


module.exports = router