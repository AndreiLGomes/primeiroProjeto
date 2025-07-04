import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuarios', // nome da tabela no MySQL
    timestamps: false // desativa createdAt e updatedAt
});

export default Usuario;
