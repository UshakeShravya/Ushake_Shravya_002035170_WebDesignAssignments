const Job = require('../models/Job');

// Create a new job
const createJob = async (req, res) => {
  try {
    const { companyName, jobTitle, description, salary } = req.body;

    const job = new Job({
      companyName,
      jobTitle,
      description,
      salary: Number(salary)
    });

    await job.save();

    res.status(201).json({
      success: true,
      job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get all jobs with pagination
const getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Job.countDocuments();
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      jobs,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  createJob,
  getAllJobs
}; 