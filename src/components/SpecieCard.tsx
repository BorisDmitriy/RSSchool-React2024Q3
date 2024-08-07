import { useContext } from 'react';
import { useRouter } from 'next/router';
import { useGetOneSpecieQuery } from '../redux';
import ThemeContext from './contex/ThemeContext';

export default function SpecieCard() {
  console.log(' specieData      ------- SpecieCard-------      ');

  const router = useRouter();
  const { id, ...restQuery } = router.query;

  const darkTheme = useContext(ThemeContext);

  console.log('darkTheme', darkTheme);

  // add redux query
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useGetOneSpecieQuery(id as string);

  const handleClose = () => {
    router.push(
      {
        pathname: '/specie',
        query: { ...restQuery },
      },
      undefined,
    );
  };

  if (isLoading || isFetching) {
    return (
      <div className="loader-wrapper">
        <div
          className={`loader ${darkTheme ? 'dark-theme' : ''}`}
          data-testid="card-loader"
        />
      </div>
    );
  }

  if (isError || !data) {
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
      <h3>Name: {data?.name}</h3>
      <p>Classification: {data?.classification}</p>
      <p>Designation: {data?.designation}</p>
      <p>Average height: {data?.average_height}</p>
      <p>Skin colors: {data?.skin_colors}</p>
      <p>Hair colors: {data?.hair_colors}</p>
      <p>Eye colors: {data?.eye_colors}</p>
      <p>AverageClifespan: {data?.average_lifespan}</p>
      <p>Language: {data?.language}</p>
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
