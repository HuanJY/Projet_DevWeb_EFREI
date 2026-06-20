const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company = sequelize.define('Company', {
  name: { type: DataTypes.STRING, allowNull: false },
  sector: { type: DataTypes.STRING },
  employees: { type: DataTypes.INTEGER, defaultValue: 0 },
  servers: { type: DataTypes.INTEGER, defaultValue: 0 },
  clientWorkstations: { type: DataTypes.INTEGER, defaultValue: 0 },
  exposedServices: { type: DataTypes.STRING } // stocké en texte séparé par virgules
});

module.exports = Company;