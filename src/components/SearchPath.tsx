import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';
import SpeciesList from './SpeciesList';
import getAllSpeciesAPI from '../api/getAllSpeciesAPI';
import getSearchedSpeciesAPI from '../api/getSearchedSpeciesAPI';
import { OneSpecie } from '../types/Types';
// import SpecieCard from './SpecieCard';

export default function SearchPath() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [inputData, setInputData] = useState(searchTerm);
  const [results, setResults] = useState<OneSpecie[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // add search name from url
  // const searchParamsAlls = new URLSearchParams(location.search);
  // const speiceParamForSpecie = searchParamsAlls.get('speice');

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
    // Fetch all species or searched species based on searchTerm
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

    // Get the current search parameters
    const searchParams = new URLSearchParams(location.search);
    // Update the search parameter with the new search term
    searchParams.set('search', encodeURIComponent(trimmedInputData));
    // Navigate to the updated URL without removing other parameters
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
          value={inputData} // Changed this to inputData to reflect the current input
          onChange={handleSearchInputChange}
        />
        <button type="button" className="btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="container">
        <SpeciesList species={results} />

        <Outlet />
      </div>
    </div>
  );
}
