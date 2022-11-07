const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const api = require('./api');
const mongoose = require('mongoose');

const app = express();

// Configs
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', api);

// Database conncection
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database ');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

module.exports = app;
