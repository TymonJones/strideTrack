import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText } from '@mui/material';

const FollowingGoals = () => {
    const [followingGoals, setFollowingGoals] = useState([]);

    const fetchFollowingGoals = async () => {
        const response = await axios.get('http://localhost:5000/api/following-goals', {
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
            <h2>Following Goals</h2>
            <List>
                {followingGoals.map(goal => (
                    <ListItem key={goal.id}>
                        <ListItemText primary={goal.title} secondary={`By: ${goal.username}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default FollowingGoals;
