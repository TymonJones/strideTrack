import React from 'react';
import { render, screen } from '@testing-library/react';
import FollowingGoals from './FollowingGoals';
import axios from 'axios';

jest.mock('axios');

describe('FollowingGoals Component', () => {
    it('renders the FollowingGoals component', async () => {
        const goals = [{ id: 1, title: 'Followed Goal', username: 'testuser' }];
        axios.get.mockResolvedValueOnce({ data: goals });
        render(<FollowingGoals />);
        expect(await screen.findByText(/followed goal/i)).toBeInTheDocument();
        expect(await screen.findByText(/by: testuser/i)).toBeInTheDocument();
    });
});


