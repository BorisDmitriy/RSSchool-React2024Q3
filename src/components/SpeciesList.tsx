import { Link, useLocation } from 'react-router-dom';
import { SpeciesListProps } from '../types/Types';
import SpecieItem from './SpecieItem';

export default function SpeciesList({ species }: SpeciesListProps) {
  const location = useLocation();
  const currentSearch = location.search;

  if (species.length === 0) {
    return (
      <div>
        <p>data not found</p>
      </div>
    );
  }
  console.log(species);

  const getIdFromUrl = (url: string) => {
    const parts = url.split('/');
    const id = parts[parts.length - 2];
    console.log(id);
    return id;
  };

  return (
    <Link className="no-link-style" to={`/specie/${currentSearch}`}>
      <div className="species_items">
        {species.map((specieData) => (
          <SpecieItem
            key={specieData.name}
            specieData={specieData}
            id={getIdFromUrl(specieData.url).toString()}
          />
        ))}
      </div>
    </Link>
  );
}
