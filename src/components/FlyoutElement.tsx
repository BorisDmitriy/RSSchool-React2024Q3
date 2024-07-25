import { useContext, useEffect, useState } from 'react';
import { clearSpecieList } from '../redux';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { OneSpecie } from '../types/Types';
import ThemeContext from './contex/ThemeContext';

export default function FlyoutElement() {
  const selectedItemsData = useAppSelector(
    (state) => state.selectedItemsSpecies.list,
  );
  const dispatch = useAppDispatch();

  const darkTheme = useContext(ThemeContext);

  const [csvDataUrl, setCsvDataUrl] = useState('');

  const convertToCSV = (data: OneSpecie[]) => {
    const headers = [
      'Name',
      'Classification',
      'Designation',
      'Average height',
      'Skin colors',
      'Hair colors',
      'Eye colors',
      'Average lifespan',
      'Homeworld',
      'Language',
      'People',
      'Films',
      'Created',
      'Edited',
      'Url',
    ];

    const rows = data.map((specie) =>
      [
        specie.name,
        specie.classification,
        specie.designation,
        specie.average_height,
        specie.skin_colors,
        specie.hair_colors,
        specie.eye_colors,
        specie.average_lifespan,
        specie.homeworld,
        specie.language,
        specie.people,
        specie.films,
        specie.created,
        specie.edited,
        specie.url,
      ].join(','),
    );

    return [headers.join(','), ...rows].join('\r\n');
  };

  useEffect(() => {
    let urlCleanup = () => {};

    if (selectedItemsData.length > 0) {
      const csvString = convertToCSV(selectedItemsData);
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      setCsvDataUrl(url);

      urlCleanup = () => {
        URL.revokeObjectURL(url);
      };
    }

    return urlCleanup;
  }, [selectedItemsData]);

  const handleClearBtn = () => {
    dispatch(clearSpecieList());
  };

  const visibilityClass = selectedItemsData.length === 0 ? 'hidden' : 'visible';
  const downloadFileName = `${selectedItemsData.length}_species.csv`;

  return (
    <div
      className={`flyout ${visibilityClass} ${darkTheme ? 'dark-theme' : ''}`}
    >
      <button
        className={`btn ${darkTheme ? 'dark-theme' : ''}`}
        onClick={handleClearBtn}
        type="button"
      >
        Unselect all
      </button>
      <h1 style={{ color: darkTheme ? 'white' : 'initial' }}>
        {selectedItemsData.length} items are selected
      </h1>

      <a
        href={csvDataUrl}
        download={downloadFileName}
        className={`btn no-link-style ${darkTheme ? 'dark-theme' : ''}`}
      >
        Download
      </a>
    </div>
  );
}
