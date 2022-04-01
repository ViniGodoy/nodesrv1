const express = require('express');
const router = express.Router();
const {Carro} = require('../model/Carro');

let carros = [];

router.post('/', async function(req, res, next) {
  if (!req.body || !req.body.placa || !req.body.renavam) {
    res.status(400).json({code: 400, erro: "Quebrou a bicicleta"});
  }

  const carro = Carro.copy(req.body);
  carros = [...carros, carro];
  return res.status(201).json(carro);
});

router.get('/', async function(req, res, next) {
  return res.json(carros);
});

router.get('/:placa', async function(req, res, next) {
  if (!req.params.placa.length !== 7) {
    return res.status(400).json({code: 400, erro: "Quebrou a bicicleta"});
  }

  const {placa} = req.params;
  const resultado = carros.filter(c => c.placa === placa);
  return res.json(resultado);
});

module.exports = router;