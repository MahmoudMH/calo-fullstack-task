import axios from 'axios';

const BASE_URL = 'http://localhost:3030/api';

export const fetchJobs = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/jobs`);
        return response.data?.jobs || [];
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
};

export const createJob = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/jobs`);
        return response.data;
    } catch (error) {
        console.error("Error creating job:", error);
        throw error;
    }
};

export const subscribeToJobUpdates = (onUpdate, onError) => {
    const eventSource = new EventSource(`${BASE_URL}/sse/jobs-updates`);

    eventSource.onmessage = (event) => {
        const updatedJobs = JSON.parse(event.data);
        onUpdate(updatedJobs);
    };

    eventSource.onerror = () => {
        console.error("Error receiving job updates.");
        if (onError) onError("Error receiving real-time updates.");
        eventSource.close();
    };

    return eventSource; // Return eventSource for manual closure if needed
};