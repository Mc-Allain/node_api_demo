const { startCase, isEmpty, isNull, isUndefined } = require('lodash');
const PokemonType = require('../models/pokemon_type');

exports.getPokemonTypes = (req, res) => {
    const params = req.params;

    const { id: filterId, value: filterValue } = params;

    let pokemonType;

    if (!isUndefined(filterId)) {
        pokemonType = PokemonType.findOne({ _id: filterId });
    } else if (!isUndefined(filterValue)) {
        pokemonType = PokemonType.findOne({ value: filterValue });
    } else {
        pokemonType = PokemonType.find();
    }

    pokemonType.select('_id value color_code')
        .then(result => {
            res.json({
                pokemon_types: result,
            });
        })
        .catch(error => {
            console.error(error);

            return res.status(400).json({ error });
        })
}

exports.createPokemonType = (req, res) => {
    const requestBody = req.body;

    PokemonType({
        ...requestBody,
        value: startCase(requestBody.value?.trim()),
        color_code: requestBody.color_code?.trim().toUpperCase(),
    })
        .save()
        .then(result => {
            res.json({
                pokemon_type: result,
            });
        })
        .catch(error => {
            console.error(error);

            return res.status(400).json({ error });
        })
}

exports.updatePokemonType = async (req, res) => {
    const params = req.params;
    const requestBody = req.body;

    const { id: filterId, value: filterValue } = params;

    let pokemonType;

    if (!isUndefined(filterId)) {
        pokemonType = await PokemonType.findOne({ _id: filterId });
    } else if (!isUndefined(filterValue)) {
        pokemonType = await PokemonType.findOne({ value: filterValue });
    }

    if (!isNull(pokemonType)) {
        pokemonType = pokemonType._doc;
    }

    PokemonType.findOneAndUpdate(pokemonType, { ...pokemonType, ...requestBody })
        .then(result => {
            PokemonType.findOne({ _id: result._id })
                .then(result => {
                    res.json({
                        pokemon_type: result,
                    });
                })
                .catch(error => {
                    console.error(error);

                    return res.status(400).json({ error });
                })
        })
        .catch(error => {
            console.error(error);

            return res.status(400).json({ error });
        })
}

exports.deletePokemonType = async (req, res) => {
    const params = req.params;

    const { id: filterId, value: filterValue } = params;

    let pokemonType;

    if (!isUndefined(filterId)) {
        pokemonType = await PokemonType.findOne({ _id: filterId });
    } else if (!isUndefined(filterValue)) {
        pokemonType = await PokemonType.findOne({ value: filterValue });
    }

    PokemonType.deleteOne(pokemonType)
        .then(result => {
            res.json({
                result
            });
        })
        .catch(error => {
            console.error(error);

            return res.status(400).json({ error });
        })
}