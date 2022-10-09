const express = require('express')
const router = express.Router()
const clientCtrl = require('../controller/client')
const clientValidate = require('../validator/client')
const auth = require('../middleware/auth')


router.get('/allClient', auth, clientCtrl.allClient)

router.post('/addClient', auth, clientValidate.addClient, clientCtrl.addClient)

router.post('/removeClient', auth, clientCtrl.removeClient)


module.exports = router