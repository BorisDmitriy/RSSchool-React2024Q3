import React from 'react';
import { AppIState } from './types/Types';
import SearchPath from './components/SearchPath';
import ErrorBoundary from './components/ErrorBoundary';
import SimulatedErrorComponent from './components/SimulatedErrorComponent';

class App extends React.Component<object, AppIState> {
  constructor(props: object) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="wrapper">
          <h1>Species in Star Wars</h1>
          <SimulatedErrorComponent />
          <SearchPath />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
