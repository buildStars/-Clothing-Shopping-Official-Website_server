const client = require('../model/client')

exports.allClient = async (req, resp, next) => {
    try {
        let res = await client.allClient(req.query)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}

exports.addClient = async (req, resp, next) => {
    try {
        let res = await client.addClient(req.body)
        resp.send(res)
    } catch (error) {
        next(error)
    }
}