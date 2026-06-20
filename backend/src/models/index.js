const sequelize = require('../config/database');
const Company = require('./company.model');
const Asset = require('./asset.model');
const Vulnerability = require('./vulnerability.model');

// une entreprise peut avoir pls actif
//mais un actif appartient à une seule entreprise
Company.hasMany(Asset, { foreignKey: 'companyId' });
Asset.belongsTo(Company, { foreignKey: 'companyId' });

// pareil ici mais avec les vulnérabilités
Asset.hasMany(Vulnerability, { foreignKey: 'assetId', onDelete: 'CASCADE' });
Vulnerability.belongsTo(Asset, { foreignKey: 'assetId' });

module.exports = { sequelize, Company, Asset, Vulnerability };