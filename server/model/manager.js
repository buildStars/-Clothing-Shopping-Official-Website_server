const md5 = require('../utils/md5')
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
    getAccount: async (body) => {
        let res = await verify(body.token, jwtSecret)

        let sql = 'select mid,name, phone,  creatAt, sex, personal_code,  role_room, role_client, role_order, role_power, user_image from manager where mid = ?'
        let params = [res.mid]
        let res2 = await db(sql, params)
        return {
            code: 'M2000',
            msg: "获取管理员信息成功",
            result: res2
        }
    },
    getAllAccount: async (body) => {

        let sql = 'select mid,name, phone, creatAt, sex, personal_code,  role_room, role_client, role_order, role_power, user_image from manager'

        let res = await db(sql)
        return {
            code: 'M2001',
            msg: "获取所有管理员信息成功",
            result: res
        }
    },
    login: async (body) => {
        body.password = md5(body.password)
        let sql = 'select * from manager where phone = ?'
        let params = [body.phone]
        let res = await db(sql, params)
        console.log(res);
        if (res.length < 1) {
            return {
                code: 'L5001',
                msg: '用户未注册！'
            }
        }
        sql = 'select mid,name, phone, creatAt, sex,personal_code,role_room,role_client,role_order,role_power,user_image from manager where phone = ? and password = ?'
        params = [body.phone, body.password]
        res = await db(sql, params)
        console.log(res);
        if (res.length < 1) {
            return {
                code: 'L5002',
                msg: '密码错误！'
            }
        } else {
            return {
                code: 'L2000',
                msg: '登录成功！',
                result: res[0]
            }
        }


    },
    register: async (body) => {
        body.password = md5(body.password)
        let sql = 'select * from manager where phone = ?'
        let params = [body.phone]
        let res = await db(sql, params)
        if (res.length > 0) {
            return {
                code: 'R5001',
                msg: '用户已存在！'
            }
        }
        let creatAt = new Date().toLocaleString()
        const user_image = user_img
        sql = 'insert into manager (name, phone,password,creatAt,sex,personal_code) value(?,?,?,?,?,?)'
        params = [body.name, body.phone, body.password, creatAt, body.sex, body.personal_code]
        await db(sql, params)
        return {
            code: 'R2000',
            msg: "注册成功！"
        }
    },
    updateAccount: async (body) => {
        let res = await verify(body.token, jwtSecret)
        let sql = 'update manager set name=?,sex=? where mid = ?'
        let params = [body.name, body.sex, res.mid]
        await db(sql, params)
        return {
            code: 'U2000',
            msg: "更新信息成功！"
        }
    },
    updateAccountImg: async (body) => {
 
        let res = await verify(body.token, jwtSecret)

        let sql = 'update manager set user_image = ? where mid = ?'
        let params = [body.user_image,res.mid]
        await db(sql, params)
        return {
            code: 'I2000',
            msg: "更新头像成功！"
        }
    },
    modifyPwd: async (body) => {
        let res = await verify(body.token, jwtSecret)
        body.oldPassword = md5(body.oldPassword)
        let sql = 'select * from manager where password = ? and mid = ?'
        let params = [body.oldPassword, res.mid]
        let res1 = await db(sql, params)
        if (res1.length < 1) {
            return {
                code: 'P4000',
                msg: "旧密码错误！"
            }
        }
        body.password = md5(body.password)
        sql = 'update manager set password=? where mid = ?'
        params = [body.password, res.mid]
        await db(sql, params)
        return {
            code: 'P2000',
            msg: "修改密码成功,请重新登录！"
        }
    },
    //修改权限
    modifyRole: async (body) => {
        let res = await verify(body.token, jwtSecret)

        let sql = 'select role_power from manager where mid = ?'
        let params = [res.mid]
        let res1 = await db(sql, params)
        console.log(typeof res1[0].role_power);
        if (res1[0].role_power != 1) {
            return {
                code: 'R4000',
                msg: "没有权限修改！"
            }
        }

        sql = 'update manager set role_room=?,role_client=?,role_order=? where mid = ?'
        params = [body.role_room, body.role_client, body.role_order, body.mid]
        await db(sql, params)
        return {
            code: 'r2000',
            msg: "修改权限成功！"
        }
    },
}