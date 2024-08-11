import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { DataSpeciesAndIdProps } from 'src/types/Types';
import SearchPath from '../../components/SearchPath';
import ErrorBoundary from '../../components/ErrorBoundary';
import SimulatedErrorComponent from '../../components/SimulatedErrorComponent';
import FlyoutElement from '../../components/FlyoutElement';
import useBodyClass from '../../components/useBodyClass';
import ThemeContext from '../../components/contex/ThemeContext';

function SpecieListPage({ dataSpecies, idData }: DataSpeciesAndIdProps) {
  console.log('!!!!!! SpecieListPage     !!!!!!!');

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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search, id, page } = context.query;
  console.log('querry', search, id, page);

  const params = new URLSearchParams();

  if (page && !Array.isArray(page)) params.append('page', page);
  if (search && !Array.isArray(search) && search !== '')
    params.append('search', search);

  const responceSearch = await fetch(
    `https://swapi.dev/api/species?${params.toString()}`,
  );
  const responceSearchJson = await responceSearch.json();

  const idData = id ? await fetch(`https://swapi.dev/api/species/${id}`) : null;
  const idDataJson = idData ? await idData.json() : null;

  console.log('responceSearch = ', responceSearchJson); // return normal data for specie
  console.log('idData = ', idDataJson); // return correct info in card
  return { props: { dataSpecies: responceSearchJson, idData: idDataJson } };
};

export default SpecieListPage;
