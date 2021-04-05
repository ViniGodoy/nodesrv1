const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.post('/', async function(req, res, next) {
    if (!req.body || !req.body.name) {
        return res.sendStatus(400);
    }

    const user = await User.create({
        name: req.body.name
    });
    return res.status(201).json(user);
});

router.get('/', async function(req, res, next) {
    return res.json(await User.findAll({
        order: [['name', 'ASC']]
    }));
});

router.patch('/:id', async function(req, res, next) {
    if (!req.params.id || !req.body || !req.body.name) {
        return res.sendStatus(400);
    }

    const {params: {id}, body: {name}} = req;

    const user = await User.findByPk(id);
    if (!user) {
        return res.sendStatus(404);
    }
    user.name = name;
    res.json(await user.save());
});

router.delete('/:id', async function(req, res, next) {
    if (!req.params.id) {
        return res.sendStatus(400);
    }

    const {params: {id}} = req;

    const user = await User.findByPk(id);
    if (!user) {
        return res.sendStatus(404);
    }
    await user.destroy();
    res.sendStatus(200);
});

module.exports = router;