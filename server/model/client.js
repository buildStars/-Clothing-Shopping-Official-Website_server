const {
    db
} = require('../config/db.js')

module.exports = {
    addClient: async (body) => {
        let sql = "insert into client(name,sex,personal_code,phone,day,room_code,creatAt,endAt,info,price,room_type) values(?,?,?,?,?,?,?,?,?,?,?)"

        let params = [body.name, body.sex, body.personal_code, body.phone, body.day, body.room_code, body.creatAt, body.endAt, body.info, body.price, body.room_type]
        let res = await db(sql, params)
        return {
            code: 'C2001',
            msg: '添加住客成功！',
        }

    },
    allClient: async (body) => {
        let sql = "select * from client"
        let res = await db(sql)
        return {
            code: 'C2000',
            msg: '获取所有住客成功!',
            result: res
        }
    },
    removeClient: async (body) => {
        let sql = "select rome_code from client where id = ?"
        let params = [body.id]
        let res = await db(sql, params)
        sql = "update room set status = 0 where home_code = ?"
        params = [res]
        await db(sql)
        sql = "delete from client where id =?"
        params = [body.id]
        await db(sql, params)
        return {
            code: 'C2002',
            msg: '结账成功！',
        }

    },
}