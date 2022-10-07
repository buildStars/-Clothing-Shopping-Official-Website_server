const express = require('express')
const router = express.Router()

//管理员相关模块
router.use('/manager', require('./manager'))
router.use('/room', require('./room'))
router.use('/homeType', require('./homeType'))
router.use('/order', require('./order'))
router.use('/client', require('./client'))

module.exports = router