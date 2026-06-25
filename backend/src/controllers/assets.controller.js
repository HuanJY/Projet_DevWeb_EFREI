const { Asset, Vulnerability, Company } = require('../models');

exports.getAssets = async (req, res) => {
  try {
    const assets = await Asset.findAll({ include: Vulnerability });
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAsset = async (req, res) => {
  try {
    const { type, name, exposedToInternet } = req.body;
    if (!type || !name) {
      return res.status(400).json({ error: "Le type et le nom de l'actif sont requis." });
    }

    const company = await Company.findOne();
    if (!company) {
      return res.status(400).json({ error: "Aucune entreprise enregistrée. Créez d'abord l'entreprise via PUT /company." });
    }

    const asset = await Asset.create({
      type,
      name,
      exposedToInternet: !!exposedToInternet,
      companyId: company.id
    });
    res.status(201).json(asset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) return res.status(404).json({ error: 'Actif non trouvé.' });
    await asset.update(req.body);
    res.json(asset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findByPk(req.params.id);
    if (!asset) return res.status(404).json({ error: 'Actif non trouvé.' });
    await asset.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};