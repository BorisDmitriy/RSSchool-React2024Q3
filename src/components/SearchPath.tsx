import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';
import SpeciesList from './SpeciesList';
import { useGetSpeciesQuery } from '../redux';
import { addCurrentPageSpecies } from '../redux/currentPageSpeciesSlice';
import { useAppDispatch } from '../redux/hooks';
import ThemeContext from './contex/ThemeContext';

export default function SearchPath() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [page, setPage] = useState(1);
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

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('search', encodeURIComponent(trimmedInputData));
    navigate({ pathname: location.pathname, search: searchParams.toString() });
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

        <div className="container-card">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
