// Function to generate a random delay in 5-second steps from 5 seconds to 1 minute
exports.getRandomDelay = () => {
    const minDelay = 5; // minimum delay in seconds
    const maxDelay = 60; // maximum delay in seconds (1 minutes)
    const step = 5; // step in seconds

    // Calculate a random delay in steps of 5 seconds between minDelay and maxDelay
    const randomSteps = Math.floor(Math.random() * ((maxDelay - minDelay) / step + 1));
    return (minDelay + randomSteps * step) * 1000; // Convert to milliseconds
};
