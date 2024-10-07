import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url.includes('/api/tasks')) {
      return Promise.resolve({
        json: () => Promise.resolve([
          { id: 1, title: 'Complete homework' },
          { id: 2, title: 'Grocery shopping' },
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

test('renders task list and allows task addition', async () => {
  render(<TaskList />);

  // Verify that the tasks are rendered
  const task1 = await screen.findByText('Complete homework');
  const task2 = await screen.findByText('Grocery shopping');
  expect(task1).toBeInTheDocument();
  expect(task2).toBeInTheDocument();

  // Simulate adding a new task
  fireEvent.change(screen.getByLabelText(/new task/i), { target: { value: 'Read a book' } });
  fireEvent.click(screen.getByText('Add Task'));

  // Ensure the new task appears
  const newTask = await screen.findByText('Read a book');
  expect(newTask).toBeInTheDocument();
});
