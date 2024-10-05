import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from './Register';
import axios from 'axios';

jest.mock('axios');

describe('Register Component', () => {
    it('renders the Register form', () => {
        render(<Register />);
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });

    it('shows a success message on successful registration', async () => {
        axios.post.mockResolvedValueOnce({});
        render(<Register />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(await screen.findByText(/registration successful/i)).toBeInTheDocument();
    });

    it('shows an error message on failed registration', async () => {
        axios.post.mockRejectedValueOnce(new Error('Error'));
        render(<Register />);
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));
        expect(await screen.findByText(/registration failed/i)).toBeInTheDocument();
    });
});
