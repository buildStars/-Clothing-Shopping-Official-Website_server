const validate = require('../middleware/validate')
const {
    body,
} = require('express-validator');


exports.addOrder = [validate(
    [
        body('client_name').notEmpty().withMessage('住客名不能为空！'),
        body('client_sex').notEmpty().withMessage('住客性别不能为空！'),
        body('client_code')
        .matches(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/)
        .withMessage('身份证格式不对！'),
        body('day').notEmpty().withMessage('入住天数不能为空！'),
        body('client_phone').notEmpty().withMessage('住客电话不能为空！'),
        body('room_code').notEmpty().withMessage('房间号不能为空！'),
        body('price').notEmpty().withMessage('金额不能为空！'),
        body('comeAt').notEmpty().withMessage('入住时间不能为空！'),
        body('endAt').notEmpty().withMessage('结束时间不能为空！'),
        body('orderAt').notEmpty().withMessage('结算时间不能为空！'),
        body('manager_name').notEmpty().withMessage('管理员姓名不能为空！'),
        body('manager_phone').notEmpty().withMessage('管理员电话不能为空！'),
    ]
)]