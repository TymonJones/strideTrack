import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Goals from '../components/Goals';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url.includes('/api/goals')) {
      return Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, title: 'Finish project' },
          { id: 2, title: 'Work out' },
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

test('renders goals and allows goal addition', async () => {
  render(<Goals />);

  // Use findByText instead of waitFor + queryByText
  const goal1 = await screen.findByText('Finish project');
  const goal2 = await screen.findByText('Work out');
  expect(goal1).toBeInTheDocument();
  expect(goal2).toBeInTheDocument();

  // Simulate adding a new goal
  fireEvent.change(screen.getByLabelText(/new goal/i), { target: { value: 'Read a book' } });
  fireEvent.click(screen.getByText('Add Goal'));

  // The new goal should appear
  const newGoal = await screen.findByText('Read a book');
  expect(newGoal).toBeInTheDocument();
});
