const express = require('express')
const router = express.Router()
const managerCtrl = require('../controller/manager')
const managerValidate = require('../validator/manager')
const auth = require('../middleware/auth')
const multer = require('multer')
const upload = multer({
    dest: 'upload/'
})
//登录
router.post('/login', managerValidate.login, managerCtrl.login)

//注册
router.post('/register', managerValidate.register, managerCtrl.register)

//获取当前登录用户信息
router.get('/getAccount', auth, managerCtrl.getAccount)

//获取所有用户信息
router.get('/getAllAccount', auth, managerCtrl.getAllAccount)

//更新当前登录用户信息
router.post('/updateAccount', auth, managerValidate.updateAccount, managerCtrl.updateAccount)

//更新当前登录用户头像
router.post('/updateAccountImg', upload.single('file'), auth,managerCtrl.updateAccountImg)

//更新当前登录用户密码
router.post('/modifyPwd', auth, managerValidate.modifyPwd, managerCtrl.modifyPwd)

//修改权限
router.post('/modifyRole', auth, managerValidate.modifyRole, managerCtrl.modifyRole)

module.exports = router