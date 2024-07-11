import { SpeciesListProps } from '../types/Types';
import SpecieItem from './SpecieItem';

export default function SpeciesList({ species }: SpeciesListProps) {
  if (species.length === 0) {
    return (
      <div>
        <p>data not found</p>
      </div>
    );
  }
  console.log(species);

  return (
    <div className="species_items">
      {species.map((specieData, index) => (
        <SpecieItem
          key={specieData.name}
          specieData={specieData}
          id={(index + 1).toString()}
        />
      ))}
    </div>
  );
}
