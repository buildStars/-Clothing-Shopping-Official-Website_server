const validate = require('../middleware/validate')
const {
    body,
} = require('express-validator');


exports.addHomeType = [validate(
    [body('type_name')
        .notEmpty().withMessage('类型名不能为空！')
    ]
)]