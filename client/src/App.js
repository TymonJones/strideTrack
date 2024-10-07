import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; 
import Register from './components/Register';
import Login from './components/Login';
import Goals from './components/Goals';
import Follow from './components/Follow';
import FollowingGoals from './components/FollowingGoals';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <h1>StrideTrack</h1>
                <Register />
                <Login />
                <Goals />
                <Follow />
                <FollowingGoals />
            </div>
        </ThemeProvider>
    );
}

export default App;
