import { useCallback, useContext } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SpecieCardProps } from 'src/types/Types';
import ThemeContext from './contex/ThemeContext';

export default function SpecieCard({ idData }: SpecieCardProps) {
  console.log('    ------- SpecieCard-------      ');
  console.log(idData);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (names: string[], values: string[]) => {
      const params = new URLSearchParams(searchParams?.toString());

      names.forEach((name, index) => {
        const value = values[index];
        if (name && value !== undefined) {
          params.set(name, value);
        }
      });

      return params.toString();
    },
    [searchParams],
  );

  const darkTheme = useContext(ThemeContext);

  const handleClose = () => {
    router.push(
      `${pathname}?${createQueryString(['search', 'id', 'page'], [searchParams?.get('search') || '', '', searchParams?.get('page') || '1'])}`,
    );
  };

  if (idData.detail) {
    return (
      <div className={`specie_card ${darkTheme ? 'dark-theme' : ''}`}>
        <h3>Data not found</h3>
        <button
          type="button"
          className={`btn closeCardBtn "no-link-style" ${darkTheme ? 'dark-theme' : ''}`}
          onClick={handleClose}
        >
          Close card
        </button>
      </div>
    );
  }

  return (
    <div className={`specie_card ${darkTheme ? 'dark-theme' : ''}`}>
      <h3>Name: {idData?.name}</h3>
      <p>Classification: {idData?.classification}</p>
      <p>Designation: {idData?.designation}</p>
      <p>Average height: {idData?.average_height}</p>
      <p>Skin colors: {idData?.skin_colors}</p>
      <p>Hair colors: {idData?.hair_colors}</p>
      <p>Eye colors: {idData?.eye_colors}</p>
      <p>AverageClifespan: {idData?.average_lifespan}</p>
      <p>Language: {idData?.language}</p>
      <button
        type="button"
        data-testid="close-card-link"
        className={`btn closeCardBtn "no-link-style" ${darkTheme ? 'dark-theme' : ''}`}
        onClick={handleClose}
      >
        Close card
      </button>
    </div>
  );
}
