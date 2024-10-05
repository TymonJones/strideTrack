import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Snackbar } from '@mui/material';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/register', { username, password });
            setMessage('Registration successful! You can log in now.');
            setOpen(true);
        } catch (error) {
            setMessage('Registration failed. Please try again.');
            setOpen(true);
        }
        setUsername('');
        setPassword('');
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    variant="outlined"
                />
                <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    variant="outlined"
                />
                <Button variant="contained" color="primary" type="submit">
                    Register
                </Button>
            </form>
            <Snackbar
                open={open}
                onClose={handleClose}
                message={message}
                autoHideDuration={4000}
            />
        </div>
    );
};

export default Register;
