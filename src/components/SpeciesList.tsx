import { useContext } from 'react';
import { DataSpeciesProps, OneSpecie } from '../types/Types';
import SpecieItem from './SpecieItem';
import ThemeContext from './contex/ThemeContext';

export default function SpeciesList({ dataSpecies }: DataSpeciesProps) {
  const darkTheme = useContext(ThemeContext);

  if (dataSpecies === undefined || dataSpecies.detail) {
    return (
      <div>
        <p>data not found!</p>
      </div>
    );
  }

  const currentPageData = dataSpecies.results;

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
