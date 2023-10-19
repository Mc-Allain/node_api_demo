const express = require('express');
const { getTypeEffectiveness, createTypeEffectiveness } = require('../controllers/type_effectiveness');
const { expressValidator, typeEffectivenessCreateValidation } = require('../helpers/index');

const router = express.Router();

router.get('/', getTypeEffectiveness);
router.get('/:id', getTypeEffectiveness);
router.get('/value/:value', getTypeEffectiveness);
router.post('/', typeEffectivenessCreateValidation, expressValidator, createTypeEffectiveness);

module.exports = router;