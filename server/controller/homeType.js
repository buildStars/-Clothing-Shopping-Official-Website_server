const homeType = require('../model/homeType')

exports.allHomeType = async (req, resp, next) => {
    try {
        let res = await homeType.allHomeType(req.query)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}

exports.getHomeTypeById = async (req, resp, next) => {
    try {
        let res = await homeType.getHomeTypeById(req.query)
        resp.send(res)
    } catch (error) {
        next(err)
    }
}
exports.removeHomeTypeById = async (req, resp, next) => {
    try {
        let res = await homeType.removeHomeTypeById(req.body)
        resp.send(res)
    } catch (error) {
        next(err)
    }
}

exports.addHomeType = async (req, resp, next) => {
    try {
        let res = await homeType.addHomeType(req.body)
        resp.send(res)
    } catch (error) {
        next(err)
    }
}
