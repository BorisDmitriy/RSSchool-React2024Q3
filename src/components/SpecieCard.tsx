import { useContext } from 'react';
import { useRouter } from 'next/router';
import { SpecieCardProps } from 'src/types/Types';
import ThemeContext from './contex/ThemeContext';

export default function SpecieCard({ idData }: SpecieCardProps) {
  console.log(' specieData      ------- SpecieCard-------      ');

  const router = useRouter();
  const { id, ...restQuery } = router.query;

  const darkTheme = useContext(ThemeContext);

  console.log('darkTheme', darkTheme);

  const handleClose = () => {
    router.push({
      pathname: '/specie',
      query: { id: '', ...restQuery },
    });
  };

  if (!idData) {
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
