import { useLocation, useNavigate } from 'react-router-dom';
import { SpecieItemProps } from '../types/Types';

export default function SpecieItem({ specieData, id }: SpecieItemProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = () => {
    // Assuming specieData has an id property that uniquely identifies each species
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('speice', id);
    navigate({ pathname: location.pathname, search: searchParams.toString() });
  };

  return (
    <button
      type="button"
      className="btn species_item"
      onClick={handleItemClick}
    >
      <h3>Name: {specieData.name}</h3>
      <p>Classification: {specieData.classification}</p>
      <p>Designation: {specieData.designation}</p>
    </button>
  );
}
