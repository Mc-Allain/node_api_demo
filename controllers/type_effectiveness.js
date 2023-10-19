const { startCase, isEmpty, isNull, isUndefined } = require('lodash');
const PokemonType = require('../models/pokemon_type');
const { TypeEffectiveness } = require('../models/type_effectiveness');

exports.getTypeEffectiveness = (req, res) => {
    const params = req.params;

    const { id: filterId, value: filterTypeId } = params;

    let typeEffectiveness;

    if (!isUndefined(filterId)) {
        typeEffectiveness = TypeEffectiveness.findOne({ _id: filterId });
    } else if (!isUndefined(filterTypeId)) {
        typeEffectiveness = TypeEffectiveness.findOne({ type_id: filterTypeId });
    } else {
        typeEffectiveness = TypeEffectiveness.find();
    }

    typeEffectiveness.select('_id type_id effectiveness')
        .then(async result => {
            const detailedResult = [];

            for (let resultItem of result) {
                const { type_id: typeId, effectiveness } = resultItem;

                const basePokemonType = await PokemonType.findOne({ _id: typeId });

                const detailedTypeEffectiveness = [];

                for (let effectValue of effectiveness) {
                    const { type_id: typeId } = effectValue;
    
                    const basePokemonType = await PokemonType.findOne({ _id: typeId });

                    effectValue = effectValue._doc;
    
                    const { value, color_code } = basePokemonType;
                    
                    detailedTypeEffectiveness.push({ ...effectValue, type: { value, color_code } });
                }

                resultItem = resultItem._doc;

                const { value, color_code } = basePokemonType;
                
                detailedResult.push({ ...resultItem, type: { value, color_code }, effectiveness: detailedTypeEffectiveness });
            }

            res.json({
                type_effectiveness: detailedResult,
            });
        })
        .catch(error => {
            console.error(error);

            return res.status(400).json({ error });
        })
}

exports.createTypeEffectiveness = (req, res) => {
    const requestBody = req.body;

    TypeEffectiveness({
        ...requestBody,
    })
        .save()
        .then(result => {
            res.json({
                type_effectiveness: result,
            });
        })
        .catch(error => {
            console.error(error);

            return res.status(400).json({ error });
        })
}