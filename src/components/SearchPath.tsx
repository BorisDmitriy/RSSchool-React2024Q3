import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';
import SpeciesList from './SpeciesList';
import getAllSpeciesAPI from '../api/getAllSpeciesAPI';
import getSearchedSpeciesAPI from '../api/getSearchedSpeciesAPI';
import { OneSpecie } from '../types/Types';

export default function SearchPath() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [inputData, setInputData] = useState(searchTerm);
  const [results, setResults] = useState<OneSpecie[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (searchData?: string) => {
    setIsLoading(true);
    try {
      let data;
      if (searchData !== '') {
        data = await getSearchedSpeciesAPI(searchData);
      } else {
        data = await getAllSpeciesAPI();
      }

      if (Array.isArray(data)) {
        setResults(data);
      } else {
        setError(true);
      }
    } catch (fetchError) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputData(event.target.value);
  };

  const handleSearch = () => {
    const trimmedInputData = inputData.trim();
    setSearchTerm(trimmedInputData);
    fetchData(trimmedInputData);

    const searchParams = new URLSearchParams(location.search);
    searchParams.set('search', encodeURIComponent(trimmedInputData));
    navigate({ pathname: location.pathname, search: searchParams.toString() });
  };

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <div className="loader" />
      </div>
    );
  }

  if (error) {
    return <div>Something went wrong...</div>;
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
        <button type="button" className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="container">
        <div className="container-list">
          <SpeciesList species={results} />
        </div>
        <div className="container-card">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
