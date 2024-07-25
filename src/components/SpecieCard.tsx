import { useContext } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useGetOneSpecieQuery } from '../redux';
import ThemeContext from './contex/ThemeContext';

export default function SpecieCard() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const currentSearch = location.search;

  const darkTheme = useContext(ThemeContext);

  // add redux query
  const {
    data = [],
    isLoading,
    isFetching,
    isError,
  } = useGetOneSpecieQuery(id);

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

  if (isError) {
    return (
      <div className={`specie_card ${darkTheme ? 'dark-theme' : ''}`}>
        <h3>Data not found</h3>

        <Link
          data-testid="close-card-link"
          className="no-link-style"
          to={`/specie/${currentSearch}`}
        >
          <button type="button" className="btn closeCardBtn">
            Close card
          </button>
        </Link>
      </div>
    );
  }

  const errorElement = () => <h3>Data not found</h3>;
  const correctElement = () => (
    <>
      <h3>Name: {data?.name}</h3>
      <p>Classification: {data?.classification}</p>
      <p>Designation: {data?.designation}</p>
      <p>Average height: {data?.average_height}</p>
      <p>Skin colors: {data?.skin_colors}</p>
      <p>Hair colors: {data?.hair_colors}</p>
      <p>Eye colors: {data?.eye_colors}</p>
      <p>AverageClifespan: {data?.average_lifespan}</p>
      <p>Language: {data?.language}</p>
    </>
  );

  return (
    <div className={`specie_card ${darkTheme ? 'dark-theme' : ''}`}>
      {isError ? errorElement() : correctElement()}
      <Link
        data-testid="close-card-link"
        className="no-link-style"
        to={`/specie/${currentSearch}`}
      >
        <button
          type="button"
          className={`btn closeCardBtn${darkTheme ? 'dark-theme' : ''}`}
        >
          Close card
        </button>
      </Link>
    </div>
  );
}
