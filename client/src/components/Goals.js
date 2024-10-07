import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editGoalId, setEditGoalId] = useState(null);

  const fetchGoals = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/goals', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      setGoals(data);
    } catch (error) {
      console.error('Failed to fetch goals:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await fetch(`http://localhost:5000/api/goals/${editGoalId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ title }),
        });
        setEditMode(false);
        setEditGoalId(null);
      } else {
        await fetch('http://localhost:5000/api/goals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({ title }),
        });
      }
      setTitle('');
      fetchGoals();
    } catch (error) {
      console.error('Failed to submit goal:', error);
    }
  };

  const handleEdit = (goal) => {
    setEditMode(true);
    setEditGoalId(goal.id);
    setTitle(goal.title);
  };

  const handleDelete = async (goalId) => {
    try {
      await fetch(`http://localhost:5000/api/goals/${goalId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchGoals();
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
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
        {goals.map((goal) => (
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
