import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Goals from './Goals';
import axios from 'axios';

jest.mock('axios');

describe('Goals Component', () => {
    it('renders the Goals component', () => {
        render(<Goals />);
        expect(screen.getByText(/goals/i)).toBeInTheDocument();
    });

    it('allows adding a goal', async () => {
        axios.get.mockResolvedValueOnce({ data: [] });
        axios.post.mockResolvedValueOnce({});
        render(<Goals />);
        fireEvent.change(screen.getByLabelText(/enter goal title/i), { target: { value: 'New Goal' } });
        fireEvent.click(screen.getByRole('button', { name: /add goal/i }));
        expect(await screen.findByText(/new goal/i)).toBeInTheDocument();
    });

    it('allows editing a goal', async () => {
        const goal = { id: 1, title: 'Initial Goal' };
        axios.get.mockResolvedValueOnce({ data: [goal] });
        axios.put.mockResolvedValueOnce({});
        render(<Goals />);
        fireEvent.click(screen.getByRole('button', { name: /edit/i }));
        fireEvent.change(screen.getByLabelText(/enter goal title/i), { target: { value: 'Updated Goal' } });
        fireEvent.click(screen.getByRole('button', { name: /update goal/i }));
        expect(await screen.findByText(/updated goal/i)).toBeInTheDocument();
    });

    it('allows deleting a goal', async () => {
        const goal = { id: 1, title: 'Goal to Delete' };
        axios.get.mockResolvedValueOnce({ data: [goal] });
        axios.delete.mockResolvedValueOnce({});
        render(<Goals />);
        fireEvent.click(screen.getByRole('button', { name: /delete/i }));
        expect(screen.queryByText(/goal to delete/i)).not.toBeInTheDocument();;
    });
});
