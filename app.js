const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');

// routes
const pokemonTypeRoutes = require('./routes/pokemon_type');

const app = express();
dotenv.config();

//db connection
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
)
  .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());


app.use('/pokemon_types', pokemonTypeRoutes);

const port = 3001;

app.listen(port, () => {
  console.log('A Node API is listening on port: ' + port);
});