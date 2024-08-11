import { Link, useSearchParams } from '@remix-run/react';
import { useContext, useEffect, useState } from 'react';
import { SpecieItemProps } from '../types/Types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addSpecie, removeSpecie } from '../redux/selectedItemsSpeciesSlice';
import ThemeContext from './contex/ThemeContext';

export default function SpecieItem({ specieData, id }: SpecieItemProps) {
  const [searchParams] = useSearchParams();
  const isActive = searchParams.get('id') === id;

  const dispatch = useAppDispatch();

  const darkTheme = useContext(ThemeContext);

  const selectedItemsData = useAppSelector(
    (state) => state.selectedItemsSpecies.list,
  );

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

  // Construct the link URL with the updated search parameters
  const itemLinkUrl = new URLSearchParams(searchParams);
  itemLinkUrl.set('id', id || '');
  const linkUrl = `?${itemLinkUrl.toString()}`;

  return (
    <div
      data-testid="specie-item"
      className={`item-container ${darkTheme ? 'dark-theme' : ''}`}
    >
      <Link
        to={linkUrl}
        className={`btn specie_item ${isActive ? 'active-item' : ''} ${darkTheme ? 'dark-theme' : ''}`}
      >
        <h3>Name: {specieData.name}</h3>
        <p>Classification: {specieData.classification}</p>
        <p>Designation: {specieData.designation}</p>
      </Link>
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
