import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorPage from '../components/ErrorPage';

const mockRouterPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

describe('ErrorPage', () => {
  it('renders the error page with a button', () => {
    render(<ErrorPage />);
    expect(
      screen.getByText('Sorry, something went wrong !'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Refresh Page' }),
    ).toBeInTheDocument();
  });
});
