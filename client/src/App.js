import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your theme
import Register from './TaskList.test.js/Register';
import Login from './TaskList.test.js/Login';
import Goals from './TaskList.test.js/Goals';
import Follow from './TaskList.test.js/Follow';
import FollowingGoals from './TaskList.test.js/FollowingGoals';

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
