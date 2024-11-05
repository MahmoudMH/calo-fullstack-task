const { broadcastUpdate } = require('../controllers/sseController');
const unsplashService = require('./unsplashService');
const dataHandler = require('../utils/dataHandler');
const { v4: uuidv4 } = require('uuid');
const { getRandomDelay } = require('../utils/getRandomDelay');

exports.createJob = () => {
    const jobId = uuidv4();
    dataHandler.saveJob({ 
        id: jobId, 
        status: 'pending', 
        createdAt: new Date().toISOString(),
        updatedAt: null,
        result: null, 
    });
    this.processJob(jobId);
    return jobId;
};

exports.processJob = async (jobId) => {
    try {
        const delay = getRandomDelay();
        console.log(`Porcessing Job ${jobId} width delay ${delay}ms`)
        await new Promise(resolve => setTimeout(resolve, delay));
        const jobData = await unsplashService.fetchImage();
        dataHandler.updateJob(jobId, { 
            status: 'resolved', 
            result: jobData,
            updatedAt: new Date().toISOString()
        });
        broadcastUpdate(dataHandler.getJobs());
    } catch (error) {
        console.error(`Error processing job ${jobId}:`, error);
        dataHandler.updateJob(jobId, { status: 'failed', result: null });
        broadcastUpdate(dataHandler.getJobs());
    }
};

exports.getAllJobs = () => dataHandler.loadData();
exports.getJobById = (jobId) => dataHandler.findJobById(jobId);
