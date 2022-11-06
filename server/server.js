const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const api = require('./api');

const app = express();

// Configs
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', api);

module.exports = app;
