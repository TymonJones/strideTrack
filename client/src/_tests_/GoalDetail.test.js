import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GoalDetail from '../components/GoalDetail';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url.includes('/api/goal/1')) {
      return Promise.resolve({
        json: () => Promise.resolve({
          id: 1, title: 'Run a marathon', details: 'Plan for a marathon in 2024',
        }),
      });
    } else if (url.includes('/api/comments')) {
      return Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, text: 'Great goal!', username: 'User1' },
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

test('renders goal details and comments', async () => {
  render(<GoalDetail goalId={1} />);

  // Check if the goal details are rendered
  const goalTitle = await screen.findByText('Run a marathon');
  const goalDetails = await screen.findByText('Plan for a marathon in 2024');
  expect(goalTitle).toBeInTheDocument();
  expect(goalDetails).toBeInTheDocument();

  // Check if the comments are rendered
  const comment1 = await screen.findByText('Great goal!');
  expect(comment1).toBeInTheDocument();

  // Simulate adding a new comment
  fireEvent.change(screen.getByLabelText(/new comment/i), { target: { value: 'Keep it up!' } });
  fireEvent.click(screen.getByText('Post Comment'));

  // Ensure the new comment appears
  const newComment = await screen.findByText('Keep it up!');
  expect(newComment).toBeInTheDocument();
});
