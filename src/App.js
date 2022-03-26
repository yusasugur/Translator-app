import React from 'react';
import LandingPage from './LandingPage/LandingPage';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './Navbar/Navbar';

function App() {
    const myTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return (
        <ThemeProvider theme={myTheme}>
            <Navbar />
            <LandingPage />
        </ThemeProvider>
    );
}

export default App;
