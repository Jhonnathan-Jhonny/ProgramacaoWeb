const Carro = require('../models/CarModel');
const { validationResult } = require('express-validator');


// Criar um novo carro
exports.create = async (req, res) => {
    // Validação dos dados de entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const carro = await Carro.create(req.body);
        res.status(201).json({
            success: true,
            data: carro,
            message: 'Carro criado com sucesso'
        });
    } catch (error) {
        res.status(400).json({ 
            success: false,
            error: 'Erro ao criar carro',
            details: error.errors ? error.errors.map(e => e.message) : error.message 
        });
    }
};
// Listar todos os carros
exports.findAll = async (req, res) => {
    try {
        const carros = await Carro.findAll();
        res.json(carros);
    } catch (error) {
        res.status(500).json({ 
            error: 'Erro ao buscar carros',
            details: error.message 
        });
    }
};

// Buscar um carro por ID
exports.findOne = async (req, res) => {
    try {
        const carro = await Carro.findByPk(req.params.id);
        if (!carro) {
            return res.status(404).json({ error: 'Carro não encontrado' });
        }
        res.json(carro);
    } catch (error) {
        res.status(500).json({ 
            error: 'Erro ao buscar carro',
            details: error.message 
        });
    }
};

// Atualizar um carro
exports.update = async (req, res) => {
    try {
        const [updated] = await Carro.update(req.body, {
            where: { codigo_modelo: req.params.id }
        });
        if (updated) {
            const updatedCarro = await Carro.findByPk(req.params.id);
            return res.json(updatedCarro);
        }
        res.status(404).json({ error: 'Carro não encontrado' });
    } catch (error) {
        res.status(500).json({ 
            error: 'Erro ao atualizar carro',
            details: error.errors ? error.errors.map(e => e.message) : error.message 
        });
    }
};

// Deletar um carro
exports.delete = async (req, res) => {
    try {
        const deleted = await Carro.destroy({
            where: { codigo_modelo: req.params.id }
        });
        if (deleted) {
            return res.json({ message: 'Carro deletado com sucesso' });
        }
        res.status(404).json({ error: 'Carro não encontrado' });
    } catch (error) {
        res.status(500).json({ 
            error: 'Erro ao deletar carro',
            details: error.message 
        });
    }
};