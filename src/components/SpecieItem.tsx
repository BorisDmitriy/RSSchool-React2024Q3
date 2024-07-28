import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { SpecieItemProps } from '../types/Types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addSpecie, removeSpecie } from '../redux/selectedItemsSpeciesSlice';
import ThemeContext from './contex/ThemeContext';

export default function SpecieItem({ specieData, id }: SpecieItemProps) {
  const location = useLocation();
  const currentSearch = location.search;

  const selectedItemsData = useAppSelector(
    (state) => state.selectedItemsSpecies.list,
  );

  const dispatch = useAppDispatch();

  const darkTheme = useContext(ThemeContext);

  const isSelected = selectedItemsData.some(
    (selectedSpecie) => selectedSpecie.name === specieData.name,
  );

  const [checked, setChecked] = useState(isSelected);

  useEffect(() => {
    setChecked(
      selectedItemsData.some(
        (selectedSpecie) => selectedSpecie.name === specieData.name,
      ),
    );
  }, [selectedItemsData, specieData.name]);

  function handleChange() {
    if (!checked) {
      dispatch(addSpecie(specieData));
    } else {
      dispatch(removeSpecie(specieData.name));
    }

    setChecked(!checked);
  }

  return (
    <div className={`item-container ${darkTheme ? 'dark-theme' : ''}`}>
      <NavLink
        data-testid="item-link"
        className="no-link-style"
        to={`/specie/${id}${currentSearch}`}
      >
        {({ isActive }) => (
          <div
            className={`btn specie_item ${isActive ? 'active-item' : ''} ${darkTheme ? 'dark-theme' : ''}`}
          >
            <h3>Name: {specieData.name}</h3>
            <p>Classification: {specieData.classification}</p>
            <p>Designation: {specieData.designation}</p>
          </div>
        )}
      </NavLink>
      <div>
        <label className="label" htmlFor={`checkbox-${id}`}>
          Select
          <input
            type="checkbox"
            id={`checkbox-${id}`}
            className="input-checkbox"
            checked={checked}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
}
