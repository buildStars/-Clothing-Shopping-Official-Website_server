const manager = require('../model/manager')
const jwt = require('../utils/jwt')
const imgRW = require('../utils/imgRW')
const {
    jwtSecret
} = require('../config/config.default')
//登录
exports.login = async (req, resp, next) => {
    try {
        let res = await manager.login(req.body)
        if (res.code == "L5002" || res.code == 'L5001') {
            return resp.send(res)
        }
        res.token = await jwt.sign({
            mid: res.result.mid
        }, jwtSecret, {
            expiresIn: 60 * 60 * 4
        })

        resp.send(res)
    } catch (error) {
        next(error)
    }
}


//注册
exports.register = async (req, resp, next) => {
    try {
        let res = await manager.register(req.body)

        resp.send(res)
    } catch (error) {
        next(error)
    }
}

//获取当前登录用户信息
exports.getAccount = async (req, resp, next) => {
    try {

        let res = await manager.getAccount(req.query)

        resp.send(res)
    } catch (error) {
        next(error)
    }
}

//获取所有用户信息
exports.getAllAccount = async (req, resp, next) => {
    try {
        let res = await manager.getAllAccount(req.query)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}

//更新当前登录用户信息
exports.updateAccount = async (req, resp, next) => {
    try {

        let res = await manager.updateAccount(req.body)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}
//更新当前登录用户头像
exports.updateAccountImg = async (req, resp, next) => {
    try {
        console.log('img', req.body);

        let user_image = await imgRW(req)
        let res = await manager.updateAccountImg({
            user_image: '/img/' + user_image,
            token: req.body.token
        })
        resp.send(res)
    } catch (error) {
        next(error)
    }
}

//修改密码
exports.modifyPwd = async (req, resp, next) => {
    try {
        let res = await manager.modifyPwd(req.body)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}


//修改权限
exports.modifyRole = async (req, resp, next) => {
    try {
        let res = await manager.modifyRole(req.body)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}