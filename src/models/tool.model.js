'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    link: {
        type: String,
        required: [true, 'Link is required'],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true
    },
    tags: [{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model('Tool', schema);