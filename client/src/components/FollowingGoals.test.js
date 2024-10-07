import React from 'react';
import { render, screen } from '@testing-library/react';
import FollowingGoals from './FollowingGoals';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url.includes('/api/following-goals')) {
      return Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, title: 'Run a marathon', username: 'User1' },
          { id: 2, title: 'Learn React', username: 'User2' },
        ]),
      });
    }
    return Promise.resolve({
      json: () => Promise.resolve([]),
    });
  });
});

afterEach(() => {
  global.fetch.mockRestore();
});

test('renders following goals', async () => {
  render(<FollowingGoals />);

  // Use findByText instead of waitFor
  const goal1 = await screen.findByText('Run a marathon');
  const user1 = await screen.findByText('User1');
  const goal2 = await screen.findByText('Learn React');
  const user2 = await screen.findByText('User2');

  expect(goal1).toBeInTheDocument();
  expect(user1).toBeInTheDocument();
  expect(goal2).toBeInTheDocument();
  expect(user2).toBeInTheDocument();
});
