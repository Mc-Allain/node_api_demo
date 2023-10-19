const { body, validationResult } = require("express-validator/check");

exports.pokemonTypeCreateValidation = [
    body('value')
        .not().isEmpty()
        .withMessage('Please enter the Pokemon type value.')
        .isLength({ min: 3, max: 16, })
        .withMessage('Pokemon type value must be between 3 and 16 characters long.'),

    body('color_code')
        .not().isEmpty()
        .withMessage('Please enter the Pokemon type color code.')
        .isLength(7)
        .withMessage('Pokemon type color code must be 7 characters long.')
        .custom(value => {
            const colorCodeRegExp = new RegExp('^#([A-Fa-f0-9]{6})$');

            const isValidColorCode = colorCodeRegExp.test(value?.trim());

            if (isValidColorCode) {
                return true;
            } else {
                return false;
            }
        })
        .withMessage('Pokemon type color code must be a valid hex color.'),
];

exports.pokemonTypeUpdateValidation = [
    body('value')
        .optional()
        .isLength({ min: 3, max: 16, })
        .withMessage('Pokemon type value must be between 3 and 16 characters long.'),

    body('color_code')
        .optional()
        .isLength(7)
        .withMessage('Pokemon type color code must be 7 characters long.')
        .custom(value => {
            const colorCodeRegExp = new RegExp('^#([A-Fa-f0-9]{6})$');

            const isValidColorCode = colorCodeRegExp.test(value?.trim());

            if (isValidColorCode) {
                return true;
            } else {
                return false;
            }
        })
        .withMessage('Pokemon type color code must be a valid hex color.'),
];

exports.typeEffectivenessCreateValidation = [
    body('type_id')
        .not().isEmpty()
        .withMessage('Please enter the Pokemon type id.'),

    body('effectiveness')
        .not().isEmpty()
        .withMessage('Please enter the effectiveness.')
        .custom((value, { req }) => {
            
        }),
];

exports.expressValidator = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        next();
    } else {
        const errorMessage = errors?.array()?.at(0)?.msg;

        return res.status(422).json({ errorMessage });
    }
}