import { useContext } from 'react';
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

  const handleClearBtn = () => {
    dispatch(clearSpecieList());
  };

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

  const handleDownloadBtn = () => {
    const csvContent = convertToCSV(selectedItemsData);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedItemsData.length}_species.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const visibilityClass = selectedItemsData.length === 0 ? 'hidden' : 'visible';

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

      <button
        className={`btn ${darkTheme ? 'dark-theme' : ''}`}
        onClick={handleDownloadBtn}
        type="button"
      >
        Download
      </button>
    </div>
  );
}
