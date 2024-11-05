const jobService = require('../services/jobService');

exports.createJob = async (req, res) => {
    try {
        const jobId = await jobService.createJob();
        res.status(201).json({ id: jobId });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ error: "Failed to create job" });
    }
};

exports.getJobs = (req, res) => {
    const jobs = jobService.getAllJobs();
    res.json(jobs);
};

exports.getJobById = (req, res) => {
    const job = jobService.getJobById(req.params.id);
    
    if(!job) res.status(404).json({ error: "Job not found" });

    if (job.status === 'resolved') {
        res.json(job);
    } else {
        res.json({ status: `Job status is ${job.status}`})
    } 
};
