const fs = require('fs')
const path = require('path')

module.exports = imgRW = (req) => {
    return new Promise((resolve, reject) => {
        fs.readFile(req.file.path, (err, data) => {
            if (err) {
                return resp.send({
                    code: 'U4001',
                    msg: '上传失败'
                })
            }
            let time = '' + Date.now() + Math.floor(Math.random() * 9999)
            let extname = req.file.mimetype.split('/')[1]
            let lastname = time + '.' + extname
            fs.writeFile(path.join(__dirname, '../static/img/' + lastname), data, (err) => {
                if (err) {
                    return resp.send({
                        code: 'U4002',
                        msg: '写入失败'
                    })
                }
                resolve(lastname)
            })
        })
    })
}