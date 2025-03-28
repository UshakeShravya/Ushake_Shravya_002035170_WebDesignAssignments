const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companiesController");

router.get("/getCompanies", companyController.getAllCompanies);

module.exports = router;