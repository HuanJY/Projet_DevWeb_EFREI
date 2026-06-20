const { Vulnerability, Asset } = require('../models');

exports.getVulnerabilities = async (req, res) => {
  try {
    const vulns = await Vulnerability.findAll({ include: Asset });
    res.json(vulns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createVulnerability = async (req, res) => {
  try {
    const { assetId, name, criticality } = req.body;
    if (!assetId || !name || !criticality) {
      return res.status(400).json({ error: 'assetId, name et criticality sont requis.' });
    }
    const asset = await Asset.findByPk(assetId);
    if (!asset) return res.status(404).json({ error: 'Actif associé non trouvé.' });

    const vuln = await Vulnerability.create({ assetId, name, criticality });
    res.status(201).json(vuln);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};