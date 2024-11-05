import React from 'react';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',  // Customize the primary color
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <h1>Calo Fullstack Task</h1>
                <JobForm />
                <JobList />
            </Container>
        </ThemeProvider>
    );
}

export default App;
