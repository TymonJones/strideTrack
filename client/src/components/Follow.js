import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Follow = () => {
    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState([]);

    const fetchUsers = async () => {
        // Replace with actual API to get all users
        // Here we assume we have an endpoint to fetch all users
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
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username} 
                        {following.some(f => f.id === user.id) ? (
                            <button onClick={() => handleUnfollow(user.id)}>Unfollow</button>
                        ) : (
                            <button onClick={() => handleFollow(user.id)}>Follow</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Follow;
