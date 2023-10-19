const { isNull, isUndefined } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonTypeSchema = new Schema({
	value: {
		type: String,
		required: true,
	},
	color_code: {
		type: String,
		required: true,
	}
});

pokemonTypeSchema.pre('save', async function (next) {
	const model = this.constructor;

	const { value } = this;

	const pokemonType = await model.findOne({ value: value });

	if (!isNull(pokemonType)) {
		return next('Pokemon type value already exists.');
	}

	next();
});

pokemonTypeSchema.pre('findOneAndUpdate', async function (next) {
	const model = this.model;
	const filter = this.getQuery();
	const update = this.getUpdate();

	const { _id: filterId, value: filterValue } = filter;
	const { value: updateValue } = update;

	const pokemonType = !isUndefined(filterId) ?
		await model.findOne({ value: updateValue, _id: { $ne: filterId } }) : (
			filterValue !== updateValue ?
				await model.find({ value: updateValue }) :
				null
		)

	if (!isNull(pokemonType)) {
		return next('Pokemon type value already exists.');
	}

	next();
});

module.exports = mongoose.model('PokemonType', pokemonTypeSchema, 'pokemon_types');