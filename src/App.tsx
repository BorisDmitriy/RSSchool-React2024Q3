import { useState } from 'react';
import SearchPath from './components/SearchPath';
import ErrorBoundary from './components/ErrorBoundary';
import SimulatedErrorComponent from './components/SimulatedErrorComponent';
import FlyoutElement from './components/FlyoutElement';
import useBodyClass from './components/useBodyClass';
import ThemeContext from './components/contex/ThemeContext';
import { DataSpeciesAndIdProps } from './types/Types';

export default function App({ dataSpecies, idData }: DataSpeciesAndIdProps) {
  const [darkTheme, setDarkTheme] = useState(false);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }
  useBodyClass('dark-theme', darkTheme);

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ErrorBoundary>
        <div className="wrapper">
          <h1 style={{ color: darkTheme ? 'white' : 'initial' }}>
            Species in Star Wars
          </h1>
          <div className="container-header-btns">
            <SimulatedErrorComponent />
            <button
              type="button"
              className={`btn ${darkTheme ? 'dark-theme' : ''}`}
              onClick={toggleTheme}
            >
              Change theme
            </button>
          </div>
          <SearchPath dataSpecies={dataSpecies} idData={idData} />
          <FlyoutElement />
        </div>
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
}
