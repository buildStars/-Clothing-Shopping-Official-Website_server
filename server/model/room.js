const {
    jwtSecret,
    user_img
} = require('../config/config.default')
const {
    decode,
    verify
} = require('../utils/jwt')
const {
    db
} = require('../config/db.js')

module.exports = {
    allRoom: async (body) => {

        let sql = 'select * from room '

        let res = await db(sql)
        return {
            code: 'R2004',
            msg: '获取所有房间成功！',
            result: res
        }
    },
    getRoomById: async (body) => {
        let sql = 'select * from room where id = ?'
        let params = [body.id]
        let res = await db(sql, params)
        return {
            code: 'R2003',
            msg: '获取房间成功！',
            result: res
        }
    },
    addRoom: async (body) => {
        let sql = 'select id from room where home_code = ?'
        let params = [body.home_code]
        let res = await db(sql, params)
        if (res.length > 0) {
            return {
                code: 'R2006',
                msg: '房间已存在！'
            }
        }
        sql = 'insert into room (home_code,home_type,price,square,status,info) value(?,?,?,?,?,?)'
        params = [body.home_code, body.home_type, body.price, body.square, body.status, body.info]
        await db(sql, params)
        return {
            code: 'R2001',
            msg: '添加房间成功！'
        }
    },
    removeRoom: async (body) => {

        let sql = 'delete from room where id = ?'
        let params = [body.id]
        await db(sql, params)
        return {
            code: 'R2002',
            msg: '删除房间成功！'
        }
    },
    editRoom: async (body) => {
   
        let sql = 'update room set home_code = ?,home_type= ?,price= ?,square= ?,status= ?,info= ? where id = ?'
        let params = [body.home_code, body.home_type, body.price, body.square, body.status, body.info, body.id]
        await db(sql, params)
        return {
            code: 'R2005',
            msg: '编辑房间成功！'
        }
    },
    editRoomImg: async (body) => {
       
        let sql = 'update room set home_image = ? where id = ?'
        let params = [body.home_image,body.id]
        await db(sql, params)
        return {
            code: 'R2006',
            msg: '编辑图片成功！'
        }
    },

}