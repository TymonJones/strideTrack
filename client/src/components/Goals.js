import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            // Update goal
            await axios.put(`http://localhost:5000/api/goals/${editGoalId}`, { title }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setEditMode(false);
            setEditGoalId(null);
        } else {
            // Create goal
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
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter goal title"
                    required
                />
                <button type="submit">{editMode ? 'Update Goal' : 'Add Goal'}</button>
            </form>
            <ul>
                {goals.map(goal => (
                    <li key={goal.id}>
                        {goal.title} 
                        <button onClick={() => handleEdit(goal)}>Edit</button>
                        <button onClick={() => handleDelete(goal.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Goals;
