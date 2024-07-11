import SearchPath from './components/SearchPath';
import ErrorBoundary from './components/ErrorBoundary';
import SimulatedErrorComponent from './components/SimulatedErrorComponent';

export default function App() {
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
