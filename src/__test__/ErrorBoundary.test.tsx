import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '../components/ErrorBoundary';

const mockRouterPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

const ProblematicChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('renders children when there are no errors', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>,
    );
    expect(getByText('Safe content')).toBeInTheDocument();
  });

  it('renders ErrorPage when an error is thrown by a child component', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ProblematicChild />
      </ErrorBoundary>,
    );

    expect(getByText(/Sorry, something went wrong/i)).toBeInTheDocument();
  });
});
