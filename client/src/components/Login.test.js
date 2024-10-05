import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import axios from 'axios';

jest.mock('axios');

describe('Login Component', () => {
    it('renders the Login form', () => {
        render(<Login />);
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('shows a success message on successful login', async () => {
        axios.post.mockResolvedValueOnce({ data: { access_token: 'fake_token' } });
        render(<Login />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
    });

    it('shows an error message on failed login', async () => {
        axios.post.mockRejectedValueOnce(new Error('Error'));
        render(<Login />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(await screen.findByText(/login failed/i)).toBeInTheDocument();
    });
});
