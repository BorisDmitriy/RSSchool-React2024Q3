import { Link, useLocation } from 'react-router-dom';
import { SpecieItemProps } from '../types/Types';

export default function SpecieItem({ specieData, id }: SpecieItemProps) {
  const location = useLocation();
  const currentSearch = location.search; // Get the current search query
  /*  const navigate = useNavigate();
  const location = useLocation(); */

  /*   const handleItemClick = () => {
    // Assuming specieData has an id property that uniquely identifies each species
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('speice', id);
    navigate({ pathname: location.pathname, search: searchParams.toString() });
  }; */

  return (
    <Link to={`/specie/${id}${currentSearch}`}>
      <div className="btn specie_item">
        <h3>Name: {specieData.name}</h3>
        <p>Classification: {specieData.classification}</p>
        <p>Designation: {specieData.designation}</p>
      </div>
    </Link>
  );
}
