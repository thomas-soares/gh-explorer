import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';

describe('EmptyState', () => {
  it('renders the provided message and action link', () => {
    render(
      <MemoryRouter>
        <EmptyState message="No data" actionLabel="Go home" actionTo="/" />
      </MemoryRouter>
    );

    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute('href', '/');
  });
});
