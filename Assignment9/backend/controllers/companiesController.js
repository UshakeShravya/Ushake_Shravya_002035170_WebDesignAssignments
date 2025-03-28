const Company = require("../models/companyModel");
 
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({ status: "success", data: { companiesList: companies } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};