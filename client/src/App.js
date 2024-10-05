import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Goals from './components/Goals';
import Follow from './components/Follow';
import FollowingGoals from './components/FollowingGoals';

function App() {
    return (
        <div>
            <h1>StrideTrack</h1>
            <Register />
            <Login />
            <Goals />
            <Follow />
            <FollowingGoals />
        </div>
    );
}

export default App;
