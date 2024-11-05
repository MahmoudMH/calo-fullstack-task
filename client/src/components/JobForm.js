import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createJob } from '../api/jobApi';
import { Button, CircularProgress, Snackbar, Alert } from '@mui/material';

const JobForm = () => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success');

    const mutation = useMutation({
        mutationFn: createJob,
        onSuccess: () => {
            setAlertMessage("Job created successfully! It may take up to 1 minute to process.");
            setAlertSeverity('success');
            setAlertOpen(true);
        },
        onError: () => {
            setAlertMessage("Failed to create job. Please try again.");
            setAlertSeverity('error');
            setAlertOpen(true);
        }
    });

    const handleCreateJob = () => {
        mutation.mutate();
    };

    return (
        <div style={{ margin: '20px 0' }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleCreateJob}
                disabled={mutation.isLoading}
                startIcon={mutation.isLoading && <CircularProgress size={20} />}
            >
                {mutation.isLoading ? 'Creating...' : 'Create New Job'}
            </Button>

            {/* Snackbar for Success/Error Messages */}
            <Snackbar
                open={alertOpen}
                autoHideDuration={4000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setAlertOpen(false)} severity={alertSeverity} variant="filled">
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default JobForm;
