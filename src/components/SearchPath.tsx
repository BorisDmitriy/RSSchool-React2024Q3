import React, { useCallback, useContext, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DataSpeciesAndIdProps } from 'src/types/Types';
import useLocalStorage from './useLocalStorage';
import SpeciesList from './SpeciesList';
import ThemeContext from './contex/ThemeContext';
import SpecieCard from './SpecieCard';

export default function SearchPath({
  dataSpecies,
  idData,
}: DataSpeciesAndIdProps) {
  console.log('!!!!!!!      SearchPath    !!!!!!');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (names: string[], values: string[]) => {
      const params = new URLSearchParams(searchParams?.toString());

      names.forEach((name, index) => {
        const value = values[index];
        if (name && value !== undefined) {
          params.set(name, value);
        }
      });

      return params.toString();
    },
    [searchParams],
  );

  const id = searchParams?.get('id');

  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [page, setPage] = useState(searchParams?.get('page') || 1);
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

    // Push the updated search term to the URL query string
    router.push(
      `${pathname}?${createQueryString(['search', 'id', 'page'], [trimmedInputData || '', id || '', page])}`,
    );
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
    router.push(
      `${pathname}?${createQueryString(['search', 'id', 'page'], [searchTerm, id, nextPage])}`,
    );
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
              disabled={
                dataSpecies.previous === null ||
                dataSpecies.detail !== undefined
              }
              onClick={() => handlePageChange(false)}
            >
              previous
            </button>
            <span className="page-span">{page}</span>
            <button
              type="button"
              className={`btn ${darkTheme ? 'dark-theme' : ''}`}
              disabled={
                dataSpecies.next === null || dataSpecies.detail !== undefined
              }
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
