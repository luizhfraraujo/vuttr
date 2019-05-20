'use strict';

const ValidationContract = require('../validators/fluent.validator');
const repository = require('../repositories/tool.repository');

exports.get = async (req, res, next) => {
    try {
        let data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Fail to process your request'
        })
    }
}

exports.getById = async (req, res, next) => {
    try {
        let data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Fail to process your request'
        })
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        let data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: 'Fail to process your request'
        })
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title, 3, 'The title must have a 3 minimum characters');
    contract.hasMinLen(req.body.link, 10, 'The link must have a 10 minimum characters');
    contract.hasMinLen(req.body.description, 3, 'The description must have a 3 minimum characters');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors());
        return;
    }

    try {
        const result = await repository.create({
            title: req.body.title,
            link: req.body.link,
            description: req.body.description,
            tags: req.body.tags,
        });
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({
            message: 'Fail to process your request',
            error: error.errmsg
        });
    }
}

exports.put = (req, res, next) => {
    repository
        .update(req.params.id, req.body)
        .then(x => {
            res.status(201).send({
                message: 'Tool update!'
            });
        }).catch(error => {
            res.status(400).send({
                message: 'Fail to process your request',
                data: error
            });
        });
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id);
        res.status(200).send({
            message: 'Tool removed!'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Fail to process your request',
            error: error
        })
    }
}

