import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SpecieItemProps } from '../types/Types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addSpecie, removeSpecie } from '../redux/selectedItemsSpeciesSlice';
import ThemeContext from './contex/ThemeContext';

export default function SpecieItem({ specieData, id }: SpecieItemProps) {
  const router = useRouter();
  const { query } = router;
  const isActive = query.id === id;

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
      <div
        role="button"
        tabIndex={0} // Make the div focusable
        onClick={() => {
          // Update the URL with the specie ID as a query parameter
          router.push(
            {
              pathname: '/specie',
              query: { ...router.query, id },
            },
            undefined,
            { shallow: true },
          );
        }}
        onKeyDown={(event) => {
          // Check if the Enter key was pressed
          if (event.key === 'Backspace') {
            router.push(
              {
                pathname: '/specie',
                query: { ...router.query, id },
              },
              undefined,
              { shallow: true },
            );
          }
        }}
        className={`btn specie_item ${isActive ? 'active-item' : ''} ${darkTheme ? 'dark-theme' : ''}`}
      >
        <h3>Name: {specieData.name}</h3>
        <p>Classification: {specieData.classification}</p>
        <p>Designation: {specieData.designation}</p>
      </div>
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
