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

  return (
    <div className="species_items">
      {species.map((specie) => (
        <SpecieItem key={specie.name} specie={specie} />
      ))}
    </div>
  );
}
