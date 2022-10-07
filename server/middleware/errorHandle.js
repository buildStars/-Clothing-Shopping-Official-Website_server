const util = require('util')

module.exports = () => {
    return (err,req,resp,next) =>{
        resp.status(500).json({
            error: util.format(err)
        })
    }
}