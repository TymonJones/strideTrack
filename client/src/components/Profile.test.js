import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from './Profile';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url.includes('/api/profile')) {
      return Promise.resolve({
        json: () => Promise.resolve({
          username: 'User1', bio: 'I love running marathons!',
        }),
      });
    } else if (url.includes('/api/goals')) {
      return Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, title: 'Run a marathon' },
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

test('renders profile information and user goals', async () => {
  render(<Profile />);

  // Check if profile information is rendered
  const username = await screen.findByText('User1');
  const bio = await screen.findByText('I love running marathons!');
  expect(username).toBeInTheDocument();
  expect(bio).toBeInTheDocument();

  // Check if the user's goals are rendered
  const goal1 = await screen.findByText('Run a marathon');
  expect(goal1).toBeInTheDocument();

  // Simulate editing bio
  fireEvent.click(screen.getByText('Edit Bio'));
  fireEvent.change(screen.getByLabelText(/bio/i), { target: { value: 'I love hiking!' } });
  fireEvent.click(screen.getByText('Save'));

  // Ensure the updated bio is rendered
  const updatedBio = await screen.findByText('I love hiking!');
  expect(updatedBio).toBeInTheDocument();
});
