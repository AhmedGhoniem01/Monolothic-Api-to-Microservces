const {check} = require('express-validator')

const validationArr = [
    check('name')
        .trim()
        .isLength({min: 3})
        .escape()
        .withMessage('A name is required'),
    check('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('A valid email is required'),
    check('title')
        .trim()
        .isLength({min: 5})
        .escape()
        .withMessage('A title is required'),
    check('message')
        .trim()
        .isLength({min: 1})
        .escape()
        .withMessage('A message is required'),
];

module.exports = {validationArr}