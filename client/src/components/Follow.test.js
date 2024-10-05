import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Follow from './Follow';
import axios from 'axios';

jest.mock('axios');

describe('Follow Component', () => {
    it('renders the Follow component', () => {
        render(<Follow />);
        expect(screen.getByText(/follow users/i)).toBeInTheDocument();
    });

    it('allows following a user', async () => {
        const user = { id: 1, username: 'testuser' };
        axios.get.mockResolvedValueOnce({ data: [user] });
        axios.post.mockResolvedValueOnce({});
        render(<Follow />);
        expect(await screen.findByText(/testuser/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /follow/i }));
        expect(await screen.findByText(/unfollow/i)).toBeInTheDocument();
    });

    it('allows unfollowing a user', async () => {
        const user = { id: 1, username: 'testuser' };
        axios.get.mockResolvedValueOnce({ data: [user] });
        axios.post.mockResolvedValueOnce({});
        axios.delete.mockResolvedValueOnce({});
        render(<Follow />);
        fireEvent.click(screen.getByRole('button', { name: /unfollow/i }));
        expect(await screen.findByText(/follow/i)).toBeInTheDocument();
    });
});
