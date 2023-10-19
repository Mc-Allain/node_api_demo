const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeEffectValueSchema = new Schema({
	type_id: {
		type: String,
		required: true,
	},
	value: {
		type: Number,
		required: true,
	}
},
{
	_id: false,
	collection: false
})

const TypeEffectValue = mongoose.model('TypeEffectValue', typeEffectValueSchema);

const typeEffectivenessSchema = new Schema({
	type_id: {
		type: String,
		required: true,
	},
	effectiveness: [{
		type: TypeEffectValue.schema,
		required: true,
	}]
});

typeEffectivenessSchema.pre('save', async function (next) {
	const model = this.constructor;
	


	next();
});

typeEffectivenessSchema.pre('findOneAndUpdate', async function (next) {
	const model = this.model;
	const filter = this.getQuery();
	const update = this.getUpdate();
	


	next();
});

const TypeEffectiveness = mongoose.model('TypeEffectiveness', typeEffectivenessSchema, 'type_effectiveness');

module.exports = {
	TypeEffectValue,
	TypeEffectiveness,
};