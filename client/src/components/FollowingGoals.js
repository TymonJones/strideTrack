import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FollowingGoals = () => {
    const [followingGoals, setFollowingGoals] = useState([]);

    const fetchFollowingGoals = async () => {
        const response = await axios.get('http://localhost:5000/api/following/goals', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setFollowingGoals(response.data);
    };

    useEffect(() => {
        fetchFollowingGoals();
    }, []);

    return (
        <div>
            <h2>Goals of Users You Follow</h2>
            <ul>
                {followingGoals.map(goal => (
                    <li key={goal.id}>{goal.title} - by {goal.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default FollowingGoals;
