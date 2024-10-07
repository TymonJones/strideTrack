import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText } from '@mui/material';

const Follow = () => {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const fetchFollowing = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/following', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setFollowing(data);
    } catch (error) {
      console.error('Failed to fetch following:', error);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/follow/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchFollowing();
    } catch (error) {
      console.error('Failed to follow user:', error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/unfollow/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchFollowing();
    } catch (error) {
      console.error('Failed to unfollow user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchFollowing();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.username} />
            {following.includes(user.id) ? (
              <Button variant="contained" color="secondary" onClick={() => handleUnfollow(user.id)}>
                Unfollow
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => handleFollow(user.id)}>
                Follow
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Follow;
