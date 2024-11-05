import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchJobs, subscribeToJobUpdates } from '../api/jobApi';
import { Box, List, ListItemText, Typography, Card, CardContent, CardMedia, CircularProgress, Snackbar, Alert } from '@mui/material';

const JobList = () => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [error, setError] = useState(null);
    const queryClient = useQueryClient();
    const { data: jobs = [], isLoading, isError } = useQuery({
        queryKey: ['jobs'],
        queryFn: fetchJobs, 
        onError: (err) => {
            console.error("Error fetching jobs:", err);
            setError("Failed to load jobs.");
            setAlertOpen(true);
        },
    });

    useEffect(() => {
        // Subscribe to job updates via SSE
        const eventSource = subscribeToJobUpdates(
            (updatedJobs) => {
                queryClient.setQueryData(['jobs'], updatedJobs);  // Update cache with real-time data
            },
            (errorMessage) => {
                setError(errorMessage);
                setAlertOpen(true);
            }
        );

        return () => eventSource.close(); // Clean up on component unmount
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'resolved':
                return 'green';
            case 'failed':
                return 'red';
            case 'pending':
                return 'yellow';
            default:
                return 'gray';
        }
    };

    return (
        <div>
            <Typography variant="h4" component="h2" gutterBottom>
                Job List
            </Typography>

            {isLoading ? (
                <CircularProgress sx={{ marginTop: '10px' }} />
            ) : jobs.length === 0 ? (
                <Typography variant="h6" color="textSecondary" sx={{ marginTop: '20px', textAlign: 'center' }}>
                    No jobs available. After creating a job, please note it may take between 5 seconds and 1 minute to process.
                </Typography>
            ) : (
                <List>
                    {jobs.map(job => (
                        <Card key={job.id} style={{ marginBottom: '15px' }}>
                            <CardContent>
                                <Box
                                    component="span"
                                    sx={{
                                        backgroundColor: getStatusColor(job.status),
                                        color: 'black',
                                        padding: '5px 10px',
                                        borderRadius: '5px',
                                        display: 'inline-block',
                                        marginBottom: '10px'
                                    }}
                                >
                                    {job.status.toUpperCase()}
                                </Box>
                                <ListItemText primary={job.title} secondary={job.result?.description} />
                                {job.result?.imageUrl && (
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={job.result.imageUrl}
                                        alt={job.result.description}
                                    />
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </List>
            )}

            {/* Alert for error messages */}
            <Snackbar
                open={isError || alertOpen}
                autoHideDuration={4000}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setAlertOpen(false)} severity="error" variant="filled">
                    {error}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default JobList;
