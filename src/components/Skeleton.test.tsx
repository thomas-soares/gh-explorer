import { render, screen } from '@testing-library/react';
import Skeleton from './Skeleton';

describe('Skeleton', () => {
  it('renders the loading skeleton with accessible status', () => {
    render(<Skeleton rows={4} />);

    expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
  });
});
