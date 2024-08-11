import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { DataSpeciesAndIdProps } from 'src/types/Types';
import useLocalStorage from './useLocalStorage';
import SpeciesList from './SpeciesList';
import ThemeContext from './contex/ThemeContext';
import SpecieCard from './SpecieCard';

export default function SearchPath({
  dataSpecies,
  idData,
}: DataSpeciesAndIdProps) {
  console.log('!!!!!!!      SEARCH PAGE    !!!!!!');
  console.log('dataSpecies and id', dataSpecies, idData);

  const router = useRouter();
  const { query } = router;
  console.log(query);

  const { id } = router.query;

  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [page, setPage] = useState(router.query.page || 1);
  console.log('page', page);
  const [inputData, setInputData] = useState(searchTerm);

  const darkTheme = useContext(ThemeContext);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputData(event.target.value);
  };

  const handleSearch = () => {
    const trimmedInputData = inputData.trim();
    setPage(1);
    setSearchTerm(trimmedInputData);
    console.log('[age search', page);

    // Push the updated search term to the URL query string
    router.push({
      pathname: '/specie/',
      query: { search: trimmedInputData, id, page: 1 },
    });
  };

  const handlePageChange = (isPlus: boolean) => {
    let nextPage = +page;

    if (isPlus) {
      nextPage += 1;
    } else {
      nextPage -= 1;
    }

    // Update the page state
    setPage(nextPage);

    // Push the updated page to the URL query string
    router.push({
      pathname: '/specie/',
      query: { search: searchTerm, id, page: nextPage },
    });
  };

  return (
    <div className="search-container">
      <div className="search-container-control">
        <input
          type="text"
          className="input"
          value={inputData}
          onChange={handleSearchInputChange}
        />
        <button
          type="button"
          className={`btn ${darkTheme ? 'dark-theme' : ''}`}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="container">
        <div className="container-list">
          <SpeciesList dataSpecies={dataSpecies} />
          <div className="container-pageBtns">
            <button
              type="button"
              className={`btn ${darkTheme ? 'dark-theme' : ''}`}
              disabled={!dataSpecies || dataSpecies.previous === null}
              onClick={() => handlePageChange(false)}
            >
              previous
            </button>
            <span className="page-span">{page}</span>
            <button
              type="button"
              className={`btn ${darkTheme ? 'dark-theme' : ''}`}
              disabled={!dataSpecies || dataSpecies.next === null}
              onClick={() => handlePageChange(true)}
            >
              next
            </button>
          </div>
        </div>
        <div className="container-card">
          {idData && <SpecieCard idData={idData} />}
        </div>
      </div>
    </div>
  );
}
