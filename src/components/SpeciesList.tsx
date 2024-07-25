import { useContext } from 'react';
import { OneSpecie } from '../types/Types';
import SpecieItem from './SpecieItem';
import { useAppSelector } from '../redux/hooks';
import ThemeContext from './contex/ThemeContext';

export default function SpeciesList() {
  const currentPageData = useAppSelector(
    (state) => state.currentPageSpecies.list,
  );

  const darkTheme = useContext(ThemeContext);

  if (currentPageData.length === 0) {
    return (
      <div>
        <p>data not found</p>
      </div>
    );
  }

  const getIdFromUrl = (url: string) => {
    const parts = url.split('/');
    const id = parts[parts.length - 2];
    return id;
  };

  return (
    <div className={`species_items  ${darkTheme ? 'dark-theme' : ''}`}>
      {currentPageData.map((specieData: OneSpecie) => (
        <SpecieItem
          key={specieData.name}
          specieData={specieData}
          id={getIdFromUrl(specieData.url).toString()}
        />
      ))}
    </div>
  );
}
