const validate = require('../middleware/validate')
const {
    body,
} = require('express-validator');
exports.register = validate(
    [body('phone').matches(/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/).withMessage('手机号格式不对！'),
        body('password').notEmpty().withMessage('密码不能为空！')
        .isLength({
            min: 6,
            max: 16
        }).withMessage('密码长度不在范围'),
        body('name').notEmpty().withMessage('昵称不能为空！'),
        body('sex').notEmpty().withMessage('性别不能为空！'),
        body('personal_code')
        .matches(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/)
        .withMessage('身份证格式不对！'),
    ]
)

exports.login = [validate(
    [body('phone').matches(/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/).withMessage('手机号格式不对！'),
        body('password').notEmpty().withMessage('密码不能为空！')
        .isLength({
            min: 6,
            max: 16
        }).withMessage('密码长度不在范围！')
    ]
)]

exports.updateAccount = [validate(
    [
        body('name').notEmpty().withMessage('昵称不能为空！'),
        body('sex').notEmpty().withMessage('性别不能为空！'),
    ]
)]

exports.modifyPwd = [validate(
    [
        body('oldPassword').notEmpty().withMessage('旧密码不能为空！')
        .isLength({
            min: 6,
            max: 16
        }).withMessage('旧密码长度不在范围！'),
        body('password').notEmpty().withMessage('新密码不能为空！')
        .isLength({
            min: 6,
            max: 16
        }).withMessage('新密码长度不在范围！')

    ]
)]

exports.modifyRole = [validate(
    [
        body('role_room').notEmpty().withMessage('修改失败！'),
        body('role_client').notEmpty().withMessage('修改失败！'),
        body('role_order').notEmpty().withMessage('修改失败！')
    ]
)]