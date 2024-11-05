const express = require('express');
const bodyParser = require('body-parser');
const jobRoutes = require('./routes/jobRoutes');
const sseRoutes = require('./routes/sseRoutes');
const cors = require('cors')

const app = express();
const PORT = 3030;

require('dotenv').config();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Enable cors 
app.use(cors());

app.use('/api', jobRoutes);
app.use('/api', sseRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});