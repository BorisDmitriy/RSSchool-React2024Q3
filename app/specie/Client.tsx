'use client';

import { useState } from 'react';
import { DataSpeciesAndIdProps } from 'src/types/Types';
import ErrorBoundary from '../../src/components/ErrorBoundary';
import FlyoutElement from '../../src/components/FlyoutElement';
import useBodyClass from '../../src/components/useBodyClass';
import ThemeContext from '../../src/components/contex/ThemeContext';
import SearchPath from '../../src/components/SearchPath';

function Client({ dataSpecies, idData }: DataSpeciesAndIdProps) {
  console.log('Client ---');

  const [darkTheme, setDarkTheme] = useState(false);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }

  // Use the custom hook to apply the class to the body element
  useBodyClass('dark-theme', darkTheme);

  return (
    <ThemeContext.Provider value={darkTheme}>
      <ErrorBoundary>
        <div className="wrapper">
          <h1 style={{ color: darkTheme ? 'white' : 'initial' }}>
            Species in Star Wars
          </h1>
          <div className="container-header-btns">
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

export default Client;
