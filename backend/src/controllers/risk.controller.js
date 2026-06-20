const { Asset, Vulnerability } = require('../models');
const { calculateRisk } = require('../services/risk.service');

exports.calculateRisk = async (req, res) => {
  try {
    const assets = await Asset.findAll();
    const vulnerabilities = await Vulnerability.findAll();
    const result = calculateRisk(assets, vulnerabilities);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};