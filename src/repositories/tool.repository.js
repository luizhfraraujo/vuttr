'use strict';
const mongoose = require('mongoose');
const Tool = mongoose.model('Tool');

exports.get = async () => {
    let res = await Tool.find({}, "id title description link tags");
    return res;
}

exports.getById = async (id) => {
    const res = await Tool.findById(id, "id title description link tags");
    return res;
}

exports.getByTag = async (tag) => {
    const res = await Tool.find({
        tags: tag,
    }, "id title description link tags");
    return res;
}

exports.create = async (data) => {
    let tool = new Tool(data);
    let res = await tool.save();
    return res;
}

exports.update = async (id, data) => {
    const res = await Tool.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            link: data.link,
            tags: data.tags,
        }
    });
    return res;
}

exports.delete = async (id) => {
    await Tool.findByIdAndRemove(id);
}