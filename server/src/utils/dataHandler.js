const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../data/data.json');

exports.loadData = () => {
    if (fs.existsSync(dataFilePath)) {
        return JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    }
    return { jobs: [] };
};

exports.saveJob = (job) => {
    const data = this.loadData();
    data.jobs.push(job);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

exports.updateJob = (jobId, updatedData) => {
    const data = this.loadData();
    const job = data.jobs.find(j => j.id === jobId);
    if (job) {
        Object.assign(job, updatedData);
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    }
};

exports.getJobs = () => {
    const data = this.loadData();
    return data.jobs.filter((job) => job.status === 'resolved');
};

exports.findJobById = (jobId) => {
    const data = this.loadData();
    return data.jobs.find(j => j.id === jobId);
};