import { SpecieItemProps } from '../types/Types';

export default function SpecieItem({ specie }: SpecieItemProps) {
  return (
    <div className="species_item">
      <h3>Name: {specie.name}</h3>
      <p>Classification: {specie.classification}</p>
      <p>Designation: {specie.designation}</p>
    </div>
  );
}
