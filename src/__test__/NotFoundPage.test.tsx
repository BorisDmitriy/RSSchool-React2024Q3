import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { debug } from 'jest-preview';
import NotFoundPage from '../components/NotFoundPage';

describe('NotFoundPage Component', () => {
  it('displays NotFoundPage', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>,
    );
    debug();

    const message = screen.getByText(/404 Not Found/i);

    expect(message).toBeInTheDocument();
  });
});
