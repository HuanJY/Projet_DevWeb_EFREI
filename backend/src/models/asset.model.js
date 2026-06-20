const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asset = sequelize.define('Asset', {
  type: {
    type: DataTypes.ENUM(
      'Serveur Web',
      'Base de données',
      'Poste utilisateur',
      'Routeur',
      'Pare-feu',
      'Application métier'
    ),
    allowNull: false
  },
  name: { type: DataTypes.STRING, allowNull: false },
  exposedToInternet: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = Asset;