const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController.js');

// Rotas CRUD para Carros
router.post('/carros', carController.create);
router.get('/carros', carController.findAll);
router.get('/carros/:id', carController.findOne);
router.put('/carros/:id', carController.update);
router.delete('/carros/:id', carController.delete);

module.exports = router;