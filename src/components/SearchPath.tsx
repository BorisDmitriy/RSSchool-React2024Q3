import React, { useContext, useState } from 'react';
import { useSearchParams } from '@remix-run/react';
import useLocalStorage from './useLocalStorage';
import SpeciesList from './SpeciesList';
import ThemeContext from './contex/ThemeContext';
import { DataSpeciesAndIdProps } from '../types/Types';
import SpecieCard from './SpecieCard';

export default function SearchPath({
  dataSpecies,
  idData,
}: DataSpeciesAndIdProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const currentPage = searchParams.get('page') || '1';
  const [inputData, setInputData] = useState(searchTerm);

  const darkTheme = useContext(ThemeContext);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log('sss');

    setInputData(event.target.value);
  };

  const handleSearch = () => {
    console.log('afs');

    const trimmedInputData = inputData.trim();
    setSearchTerm(trimmedInputData); // Save the search term in local storage

    // Update the search parameters with the trimmed input data and reset the page number
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('search', trimmedInputData);
    newSearchParams.set('page', '1'); // Reset page to 1 on new search
    setSearchParams(newSearchParams); // Pass the entire newSearchParams object

    console.log('Search query added:', trimmedInputData);
  };

  // Function to change the page query parameter
  const changePage = (newPage: number) => {
    // Update the search parameters with the new page number
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
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
              disabled={+currentPage <= 1}
              onClick={() => changePage(+currentPage - 1)}
            >
              Previous
            </button>
            <span className="page-span">{currentPage}</span>
            <button
              type="button"
              className={`btn ${darkTheme ? 'dark-theme' : ''}`}
              disabled={!dataSpecies.next}
              onClick={() => changePage(+currentPage + 1)}
            >
              Next
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
