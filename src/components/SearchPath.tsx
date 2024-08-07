import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useLocalStorage from './useLocalStorage';
import { useGetSpeciesQuery } from '../redux';
import SpeciesList from './SpeciesList';
import { addCurrentPageSpecies } from '../redux/currentPageSpeciesSlice';
import { useAppDispatch } from '../redux/hooks';
import ThemeContext from './contex/ThemeContext';
import SpecieCard from './SpecieCard';

export default function SearchPath() {
  console.log('!!!!!!!      SEARCH PAGE    !!!!!!');

  const router = useRouter();
  const { query } = router;
  const { id } = router.query;

  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [page, setPage] = useState(
    query.page ? parseInt(query.page as string, 10) : 1,
  );
  const [inputData, setInputData] = useState(searchTerm);

  const darkTheme = useContext(ThemeContext);

  // add redux
  const {
    data = [],
    isError,
    isLoading,
    isFetching,
  } = useGetSpeciesQuery({ page, searchTerm });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isFetching) {
      dispatch(addCurrentPageSpecies(data));
    }
  }, [data, dispatch, isFetching]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputData(event.target.value);
  };

  const handleSearch = () => {
    const trimmedInputData = inputData.trim();
    setPage(1);
    setSearchTerm(trimmedInputData);
    // Update the URL with the search term
    const searchParams = new URLSearchParams();
    if (trimmedInputData) {
      searchParams.set('search', trimmedInputData);
    }
    // Push the updated search term to the URL query string
    router.push(
      {
        pathname: router.pathname,
        query: searchParams.toString(),
      },
      undefined,
      { shallow: true },
    );
  };

  if (isLoading || isFetching) {
    return (
      <div className="loader-wrapper">
        <div className={`loader ${darkTheme ? 'dark-theme' : ''}`} />
      </div>
    );
  }

  if (isError) {
    console.error('error');
    throw new Error('Error!!!');
  }

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
          <SpeciesList />
          <div className="container-pageBtns">
            <button
              type="button"
              className={`btn ${darkTheme ? 'dark-theme' : ''}`}
              disabled={data.previous === null}
              onClick={() => setPage((prevPage) => prevPage - 1)}
            >
              previous
            </button>
            <span className="page-span">{page}</span>
            <button
              type="button"
              className={`btn ${darkTheme ? 'dark-theme' : ''}`}
              disabled={data.next === null}
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              next
            </button>
          </div>
        </div>
        <div className="container-card">{id && <SpecieCard />}</div>
      </div>
    </div>
  );
}
