# Calo fullstack task

This project is a full-stack application with a React frontend and an Express backend that handles job creation and retrieval from the Unsplash API. The application uses React Query for data fetching, caching, and retry logic, ensuring robust handling of network instability.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Time Report](#time-report)

## Setup Instructions

### Prerequisites

- **Node.js** (version 14 or later)
- **npm** (Node Package Manager)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/calo-fullstack-task.git
   cd calo-fullstack-task
   ```

2. **Install root dependencies (for concurrently running the client and server)**:

   ```bash
   npm install
   ```

3. **Install client dependencies**:

   ```bash
   cd client
   npm install
   ```

4. **Install server dependencies**:

   ```bash
   cd ../server
   npm install
   ```

5. **Set up environment variables**:

   ```bash
   UNSPLASH_CLIENT_ID=your_unsplash_api_client_id
   ```

### Running the Application

1. **Start both client and server from the root directory**:

   ```bash
   npm start
   ```

2. **Access the application**:

 - The frontend will run on ```http://localhost:3000```
 - The backend (API) will run on ```http://localhost:3030```


### API Endpoints

 - **GET** /api/jobs - Retrieves all jobs
 - **GET** /api/jobs/{id} - Return job status or resolved job by id
 - **POST** /api/jobs - Creates a new job (retrieves an Unsplash image after a random delay)
 - **GET** /api/sse/jobs-updates - Server-Sent Events (SSE) for real-time job updates

### Project Structure

   ```bash
   /project-root
   ├── client                  # React frontend
   │   ├── src
   │   │   └── api             # API calls (fetchJobs, createJob, subscribeToJobUpdates)
   │   │   └── components      # UI Components (JobForm, JobList)
   │   │   └── App.js          # Caller for UI Components
   │   │   └── index.js        # The entry point for the React frontend application
   ├── server                  # Express backend
   │   ├── controllers         # Controller files for the job and SSE logic
   │   ├── routes              # Route definitions
   │   ├── services            # Business logic and API integration
   │   ├── utils               # Utility functions
   │   ├── data                # Data storage for jobs
   │   ├── app.js              # Main server setup
   │   └── .env                # Environment variables for server
   ├── package.json            # Root package.json for concurrently setup
   └── README.md               # Project documentation
   ```

## Time Report

| Section                         | Description                                                                 | Time Spent |
|---------------------------------|-----------------------------------------------------------------------------|------------|
| **Project Setup**               | Initial setup, creating folders, installing dependencies                   | 1 hour     |
| **Frontend - JobForm Component**| Creating the job form, and setting up job creation.                        | 2 hours    |
| **Frontend - JobList Component**| Implementing job list display, real-time updates, handling empty states    | 3 hours    |
| **React Query Integration**     | Setting up React Query, retry logic, refetch on reconnect                  | 1 hour     |
| **Backend - API Setup**         | Building Express routes, job handling, delay simulation                    | 2 hours    |
| **Backend - Unsplash Setup**    | Setup a new app & generate a new client id to retrieve the data            | 2 hours    |
| **Backend - SSE Implementation**| Setting up Server-Sent Events for real-time updates                        | 1 hour     |
| **Error Handling**              | Adding error handling for unstable network, offline detection, retries     | 1.5 hours  |
| **Testing and Debugging**       | Manual testing, troubleshooting errors, verifying retry behavior           | 2.5 hours  |
| **Documentation**               | Writing the README, creating setup instructions, and time report           | 1 hour     |
| **Total Time**                  |                                                                            | **17 hours** |



