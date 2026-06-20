const { Company } = require('../models');

exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findOne();
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    let company = await Company.findOne();
    if (!company) {
      company = await Company.create(req.body);
    } else {
      await company.update(req.body);
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};