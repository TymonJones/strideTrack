import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; 

describe('App Component', () => {
  it('renders the main application component', () => {
    // Render the App component
    render(<App />);

    // Check if specific text or elements are present
    const titleElement = screen.getByText(/Welcome to StrideTrack/i); // Example text
    expect(titleElement).toBeInTheDocument();

    // Check if the Login component is rendered (if applicable)
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    // Check if the Register component is rendered (if applicable)
    const registerLink = screen.getByRole('link', { name: /register/i });
    expect(registerLink).toBeInTheDocument();
  });
});

