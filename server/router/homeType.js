const express = require('express')
const router = express.Router()
const homeTypeCtrl = require('../controller/homeType')
const homeTypeValidate = require('../validator/homeType')
const auth = require('../middleware/auth')

//全部房型
router.get('/allHomeType', auth, homeTypeCtrl.allHomeType)

//获取指定id房型数据
router.get('/getHomeTypeById', auth, homeTypeCtrl.getHomeTypeById)

//删除房型
router.post('/removeHomeTypeById', auth, homeTypeCtrl.removeHomeTypeById)

//增加房型
router.post('/addHomeType', auth, homeTypeValidate.addHomeType, homeTypeCtrl.addHomeType)

module.exports = router