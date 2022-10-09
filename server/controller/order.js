const order = require('../model/order')

exports.allOrder = async (req, resp, next) => {
    try {
        let res = await order.allOrder(req.query)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}

exports.removeOrderById = async (req, resp, next) => {
    try {
        let res = await order.removeOrderById(req.body)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}

exports.addOrder = async (req, resp, next) => {
    try {
        let res = await order.addOrder(req.body)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}
