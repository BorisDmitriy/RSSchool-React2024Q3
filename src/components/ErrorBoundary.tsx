import React from 'react';
import { ErrorBoundaryIState, ErrorBoundaryProps } from '../types/Types';

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryIState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryIState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Caught error:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div>
          <h1>Sorry, something went wrong !</h1>
          <button
            className="btn"
            onClick={() => window.location.reload()}
            type="button"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return children;
  }
}
