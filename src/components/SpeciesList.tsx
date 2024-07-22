import { OneSpecie } from '../types/Types';
import SpecieItem from './SpecieItem';
import { useAppSelector } from '../redux/hooks';

export default function SpeciesList() {
  const currentPageData = useAppSelector(
    (state) => state.currentPageSpecies.list,
  );
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
    <div className="species_items">
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
