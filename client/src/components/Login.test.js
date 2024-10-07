import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url.includes('/api/login')) {
      return Promise.resolve({
        json: () => Promise.resolve({ success: true, token: 'dummyToken' }),
      });
    }
    return Promise.resolve({
      json: () => Promise.resolve({}),
    });
  });
});

afterEach(() => {
  global.fetch.mockRestore();
});

test('renders login form and allows submission', async () => {
  render(<Login />);

  // Fill out form fields
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'user1' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

  // Simulate form submission
  fireEvent.click(screen.getByText('Login'));

  // Use findByText to handle waiting for API response
  const successMessage = await screen.findByText('Login successful');
  expect(successMessage).toBeInTheDocument();
});
