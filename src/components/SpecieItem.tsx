import { useCallback, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SpecieItemProps } from '../types/Types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addSpecie, removeSpecie } from '../redux/selectedItemsSpeciesSlice';
import ThemeContext from './contex/ThemeContext';
import createUrlQueryString from './createUrlQueryString';

export default function SpecieItem({ specieData, id }: SpecieItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = useCallback(
    (names: string[], values: string[]) =>
      createUrlQueryString(names, values, searchParams),
    [searchParams],
  );

  const isActive = searchParams?.get('id') === id;

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
    <div
      data-testid="specie-item"
      className={`item-container ${darkTheme ? 'dark-theme' : ''}`}
    >
      <div
        role="button"
        tabIndex={0} // Make the div focusable
        onClick={() => {
          router.push(
            `${pathname}?${queryString(['search', 'id', 'page'], [searchParams?.get('search') || '', id, searchParams?.get('page') || '1'])}`,
          );
        }}
        onKeyDown={(event) => {
          // Check if the Backspace key was pressed
          if (event.key === 'Backspace') {
            router.push(
              `${pathname}?${queryString(['search', 'id', 'page'], [searchParams?.get('search') || '', id, searchParams?.get('page') || '1'])}`,
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
