import { SpeciesListProps } from '../types/Types';
import SpecieItem from './SpecieItem';

export default function SpeciesList({ species }: SpeciesListProps) {
  return (
    <div className="species_items">
      {species.map((specie) => (
        <SpecieItem key={specie.name} specie={specie} />
      ))}
    </div>
  );
}
