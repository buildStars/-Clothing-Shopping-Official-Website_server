const express = require('express')
const router = express.Router()
const roomCtrl = require('../controller/room')
const roomValidate = require('../validator/room')
const auth = require('../middleware/auth')

const multer = require('multer')
const upload = multer({
    dest: 'upload/'
})
//全部房间
router.get('/allRoom', auth, roomCtrl.allRoom)

//获取指定id房间
router.get('/getRoomById', auth, roomCtrl.getRoomById)

//添加房间
router.post('/addRoom', auth, roomValidate.addRoom, roomCtrl.addRoom)

//删除指定id房间
router.post('/removeRoom', auth, roomCtrl.removeRoom)

//编辑指定房间
router.post('/editRoom', auth, roomValidate.addRoom, roomCtrl.editRoom)

//编辑指定房间图片
router.post('/editRoomImg', upload.single('file'), auth, roomCtrl.editRoomImg)

module.exports = router