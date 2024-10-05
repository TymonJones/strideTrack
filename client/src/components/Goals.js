import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [title, setTitle] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editGoalId, setEditGoalId] = useState(null);

    const fetchGoals = async () => {
        const response = await axios.get('http://localhost:5000/api/goals', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setGoals(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editMode) {
            await axios.put(`http://localhost:5000/api/goals/${editGoalId}`, { title }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setEditMode(false);
            setEditGoalId(null);
        } else {
            await axios.post('http://localhost:5000/api/goals', { title }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
        }
        setTitle('');
        fetchGoals();
    };

    const handleEdit = (goal) => {
        setEditMode(true);
        setEditGoalId(goal.id);
        setTitle(goal.title);
    };

    const handleDelete = async (goalId) => {
        await axios.delete(`http://localhost:5000/api/goals/${goalId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        fetchGoals();
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <div>
            <h2>Goals</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Enter goal title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    variant="outlined"
                />
                <Button variant="contained" color="primary" type="submit">
                    {editMode ? 'Update Goal' : 'Add Goal'}
                </Button>
            </form>
            <List>
                {goals.map(goal => (
                    <ListItem key={goal.id}>
                        <ListItemText primary={goal.title} />
                        <Button onClick={() => handleEdit(goal)}>Edit</Button>
                        <Button onClick={() => handleDelete(goal.id)}>Delete</Button>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Goals;
