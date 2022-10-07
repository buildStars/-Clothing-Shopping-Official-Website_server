const express = require('express')
const router = express.Router()
const orderCtrl = require('../controller/order')
const orderValidate = require('../validator/order')
const auth = require('../middleware/auth')

//全部账单记录
router.get('/allOrder', auth, orderCtrl.allOrder)

//添加账单记录
router.post('/addOrder', auth, orderValidate.addOrder, orderCtrl.addOrder)

//删除指定id账单记录
router.post('/removeOrderById', auth,  orderCtrl.removeOrderById)




module.exports = router