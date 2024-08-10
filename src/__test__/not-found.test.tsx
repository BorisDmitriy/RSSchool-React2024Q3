import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import NotFound from '../../app/not-found';

describe('NotFound', () => {
  it('renders the not found message and return home link', () => {
    const { getByText, getByRole } = render(<NotFound />);

    expect(getByText('Not Found')).toBeInTheDocument();
    expect(getByText('Could not find requested resource')).toBeInTheDocument();

    const homeLink = getByRole('link');
    expect(homeLink).toHaveAttribute('href', '/specie');
    expect(homeLink.textContent).toBe('Return Home');
  });
});
