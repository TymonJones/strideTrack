import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, List, ListItem, ListItemText } from '@mui/material';

const Follow = () => {
    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState([]);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
    };

    const fetchFollowing = async () => {
        const response = await axios.get('http://localhost:5000/api/following', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setFollowing(response.data);
    };

    const handleFollow = async (userId) => {
        await axios.post(`http://localhost:5000/api/follow/${userId}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        fetchFollowing(); // Refresh following list
    };

    const handleUnfollow = async (userId) => {
        await axios.delete(`http://localhost:5000/api/unfollow/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        fetchFollowing(); // Refresh following list
    };

    useEffect(() => {
        fetchUsers();
        fetchFollowing();
    }, []);

    return (
        <div>
            <h2>Follow Users</h2>
            <List>
                {users.map(user => (
                    <ListItem key={user.id}>
                        <ListItemText primary={user.username} />
                        {following.some(f => f.id === user.id) ? (
                            <Button onClick={() => handleUnfollow(user.id)}>Unfollow</Button>
                        ) : (
                            <Button onClick={() => handleFollow(user.id)}>Follow</Button>
                        )}
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Follow;
