'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

//Connect on Database
mongoose.connect(config.connectionString);

const Tool = require('./models/tool.model');
const User = require('./models/user.model');

//Routes
const indexRoute = require('./routes/index.route');
const toolRoute = require('./routes/tool.route');
const userRoute = require('./routes/user.route');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


app.use('/', indexRoute);
app.use('/tools', toolRoute);
app.use('/users', userRoute);

module.exports = app;