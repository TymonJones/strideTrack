import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Follow from './Follow';

// Mocking the fetch API
beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url.includes('api/users')) {
      return Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, username: 'User1' },
          { id: 2, username: 'User2' },
        ]),
      });
    }
    if (url.includes('api/following')) {
      return Promise.resolve({
        json: () => Promise.resolve([1]), // Mock following list with user ID 1
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

test('renders users and shows follow/unfollow buttons', async () => {
  render(<Follow />);

  // Verify that the users are rendered
  const user1 = await screen.findByText('User1');
  const user2 = await screen.findByText('User2');
  expect(user1).toBeInTheDocument();
  expect(user2).toBeInTheDocument();

  // Check that the first user is already followed, and the second is not
  const unfollowButton = screen.getByText('Unfollow');
  const followButton = screen.getByText('Follow');
  expect(unfollowButton).toBeInTheDocument();
  expect(followButton).toBeInTheDocument();
});

test('allows following and unfollowing users', async () => {
  render(<Follow />);

  const followButton = await screen.findByText('Follow');
  
  // Simulate following a user
  fireEvent.click(followButton);
  
  // After clicking, we expect the "Unfollow" button to appear
  const unfollowButton = await screen.findByText('Unfollow');
  expect(unfollowButton).toBeInTheDocument();
});
