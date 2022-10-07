const {
    db
} = require('../config/db.js')

module.exports = {
    allOrder: async (body) => {

        let sql = 'select * from order_history'
        let res = await db(sql)
        console.log(res);
        return {
            code: 'O2000',
            msg: "获取账单记录成功！",
            result: res
        }
    },
    removeOrderById: async (body) => {
        let sql = 'delete from order_history where id = ?'
        let params = [body.id]
        await db(sql, params)
        return {
            code: 'O2001',
            msg: '删除账单记录成功！'
        }
    },
    addOrder: async (body) => {

  
        let sql = 'insert into order_history (client_name,client_sex,client_code,day,client_phone,room_code,price,info,comeAt,endAt,orderAt,manager_name,manager_phone) values(?,?,?,?,?,?,?,?,?,?,?,?,?)'
        let params = [body.client_name, body.client_sex, body.client_code, body.day, body.client_phone, body.room_code, body.price, body.info, body.comeAt, body.endAt, body.orderAt, body.manager_name, body.manager_phone]

        let res = await db(sql, params)

        return {
            code: 'O2002',
            msg: '添加账单记录成功！',
        }
    }

}