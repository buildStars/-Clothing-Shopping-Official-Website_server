const {verify} = require('../utils/jwt')
const {
    jwtSecret
} = require('../config/config.default')
module.exports = async (req, resp, next) => {
    //获取token

    let token = req.body.token || req.query.token 
    token = token ? token : null

    if (!token) {
        return resp.send({
            code: 'A4001',
            msg: '无token'
        })
    }

    try {
        let res = await verify(token, jwtSecret)
        console.log(res);
        next()
    } catch (error) {
        return resp.send({
            code: 'A401',
            msg: 'token失效'
        })
    }
}