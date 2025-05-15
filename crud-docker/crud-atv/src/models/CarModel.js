const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carro = sequelize.define('Carro', {
    codigo_modelo: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    nome_modelo: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O nome do modelo é obrigatório'
            }
        }
    },
    codigo_marca: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O código da marca é obrigatório'
            }
        }
    },
    cidade: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    bairro: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    cep: { 
        type: DataTypes.STRING, 
        allowNull: true,
        validate: {
            is: /^\d{5}-?\d{3}$/i
        }
    },
    estado: { 
        type: DataTypes.STRING, 
        allowNull: true,
        validate: {
            len: [2, 2],
            isUppercase: true
        }
    },
    valor_aluguel: { 
        type: DataTypes.FLOAT, 
        allowNull: false,
        validate: {
            isFloat: {
                msg: 'O valor do aluguel deve ser um número'
            },
            min: {
                args: [0],
                msg: 'O valor do aluguel não pode ser negativo'
            }
        }
    }
}, {
    tableName: 'carros',
    timestamps: true,
    createdAt: 'data_criacao',
    updatedAt: 'data_atualizacao'
});

// Sincroniza o modelo com o banco de dados (cria a tabela se não existir)
Carro.sync({ alter: true })
    .then(() => console.log('Tabela Carros sincronizada'))
    .catch(err => console.error('Erro ao sincronizar tabela Carros:', err));

module.exports = Carro;