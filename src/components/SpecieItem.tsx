import { NavLink, useLocation } from 'react-router-dom';
import { SpecieItemProps } from '../types/Types';

export default function SpecieItem({ specieData, id }: SpecieItemProps) {
  const location = useLocation();
  const currentSearch = location.search;

  return (
    <NavLink className="no-link-style" to={`/specie/${id}${currentSearch}`}>
      {({ isActive }) => (
        <div
          className={
            isActive ? 'btn specie_item active-item' : 'btn specie_item'
          }
        >
          <h3>Name: {specieData.name}</h3>
          <p>Classification: {specieData.classification}</p>
          <p>Designation: {specieData.designation}</p>
        </div>
      )}
    </NavLink>
  );
}
