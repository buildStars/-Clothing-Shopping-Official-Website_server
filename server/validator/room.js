const validate = require('../middleware/validate')
const {
    body,
} = require('express-validator');


exports.addRoom = [validate(
    [
        body('home_code').notEmpty().withMessage('房间号不能为空！'),
        body('home_type').notEmpty().withMessage('房间类型不能为空！'),
        body('price').notEmpty().withMessage('价格不能为空！'),
        body('square').notEmpty().withMessage('面积不能为空！'),
        body('status').notEmpty().withMessage('状态不能为空！'),
    ]
)]