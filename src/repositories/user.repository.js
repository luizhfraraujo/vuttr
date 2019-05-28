'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.create = async (data) => {
    let user = new User(data);
    let res = await user.save();
    return res;
}

exports.authenticate = async (data) => {
    const res = await User.findOne({
        email: data.email,
        password: data.password
    });
    return res;
}

exports.getById = async (id) => {
    const res = await Customer.findById(id);
    return res;
}

exports.delete = async (id) => {
    await User.findByIdAndRemove(id);
}