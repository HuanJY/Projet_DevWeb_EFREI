const express = require('express');
const cors = require('cors');
const { sequelize } = require('./src/models');

const companyRoutes = require('./src/routes/company.routes');
const assetsRoutes = require('./src/routes/assets.routes');
const vulnerabilitiesRoutes = require('./src/routes/vulnerabilities.routes');
const riskRoutes = require('./src/routes/risk.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

console.log('company:', typeof companyRoutes);
console.log('assets:', typeof assetsRoutes);
console.log('vulnerabilities:', typeof vulnerabilitiesRoutes);
console.log('risk:', typeof riskRoutes);

app.use('/company', companyRoutes);
app.use('/assets', assetsRoutes);
app.use('/vulnerabilities', vulnerabilitiesRoutes);
app.use('/risk', riskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API CyberTwin - opérationnelle' });
});

// Synchronise les modèles avec la BDD (crée les tables si elles n'existent pas)
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de données synchronisée.');
    app.listen(PORT, () => {
      console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion à la BDD :', err);
  });