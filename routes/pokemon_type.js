const express = require('express');
const { getPokemonTypes, createPokemonType, updatePokemonType, deletePokemonType } = require('../controllers/pokemon_type');
const { expressValidator, pokemonTypeCreateValidation, pokemonTypeUpdateValidation } = require('../helpers/index');

const router = express.Router();

router.get('/', getPokemonTypes);
router.get('/:id', getPokemonTypes);
router.get('/value/:value', getPokemonTypes);
router.post('/', pokemonTypeCreateValidation, expressValidator, createPokemonType);
router.put('/:id', pokemonTypeUpdateValidation, expressValidator, updatePokemonType);
router.put('/value/:value', pokemonTypeUpdateValidation, expressValidator, updatePokemonType);
router.delete('/:id', deletePokemonType);
router.delete('/value/:value', deletePokemonType);

module.exports = router;