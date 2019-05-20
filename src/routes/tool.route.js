'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/tool.controller');

router.get('/', controller.get);
router.get('/:id', controller.put);
router.get('/tags/:tag', controller.getByTag);

router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;