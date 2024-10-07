import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../components/Register';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    if (url.includes('/api/register')) {
      return Promise.resolve({
        json: () => Promise.resolve({ success: true, message: 'User registered' }),
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

test('renders register form and allows submission', async () => {
  render(<Register />);

  // Fill out form fields
  fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'newUser' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

  // Simulate form submission
  fireEvent.click(screen.getByText('Register'));

  // Use findByText which automatically waits for the element
  const successMessage = await screen.findByText('User registered');
  expect(successMessage).toBeInTheDocument();
});
