const {
    db
} = require('../config/db.js')

module.exports = {
    allHomeType: async (body) => {

        let sql = 'select * from home_type'
        let res = await db(sql)
        return {
            code: 'H2003',
            msg: "获取房间类型成功！",
            result: res
        }
    },
    getHomeTypeById: async (body) => {
        let sql = 'select * from home_type where id = ?'
        let params = [body.id]
        let res = await db(sql, params)
        return {
            code: 'H2002',
            msg: "获取指定房间类型成功！",
            result: res
        }
    },
    removeHomeTypeById: async (body) => {
        let sql = 'delete from home_type where id = ?'
        let params = [body.id]
        await db(sql, params)
        return {
            code: 'H2001',
            msg: '删除房型成功！'
        }
    },
    addHomeType: async (body) => {
        console.log(body);
        let sql = 'select type_name from home_type where type_name = ?'
        let params = [body.type_name]
        let res = await db(sql, params)
        if (res.length > 0) {
            return {
                code: 'H5001',
                msg: '房间类型已存在！'
            }
        }
        sql = 'insert into home_type (type_name) value(?)'
        params = [body.type_name]
        await db(sql, params)
        return {
            code: 'H2000',
            msg: '添加房间类型成功！'
        }
    }

}