import React, { useState } from 'react';
import { TextField, Button, Snackbar } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      setMessage('Login successful!');
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
    }

    setOpen(true);
    setUsername('');
    setPassword('');
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h2>Login</h2>
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
          Login
        </Button>
      </form>
      <Snackbar open={open} onClose={handleClose} message={message} autoHideDuration={4000} />
    </div>
  );
};

export default Login;
