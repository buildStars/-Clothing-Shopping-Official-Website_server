const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./router')
const errorHanler = require('./middleware/errorHandle')
const app = express()
const path = require('path')
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use(express.static(path.join(__dirname, "static")))

// app.all('*', function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Expose-Headers', '*');
//     res.header('Content-Type', 'application/json;charset=utf-8');
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     next()
// })

//挂载路由 设置前缀
app.use('/api', router)

//同一错误处理中间件
app.use(errorHanler)

app.listen(3001, () => {
    console.log('服务已开启监听3001');

})