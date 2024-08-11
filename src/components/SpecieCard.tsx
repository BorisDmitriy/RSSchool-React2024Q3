import { useContext } from 'react';
import { Link, useSearchParams } from '@remix-run/react';
import ThemeContext from './contex/ThemeContext';
import { SpecieCardProps } from '../types/Types';

export default function SpecieCard({ idData }: SpecieCardProps) {
  const [searchParams] = useSearchParams();

  const darkTheme = useContext(ThemeContext);

  // Create a new URLSearchParams object with the updated parameters
  const updatedSearchParams = new URLSearchParams(searchParams);
  updatedSearchParams.set('id', ''); // Clear the 'id' parameter

  // Construct the close link URL with the updated search parameters
  const closeLinkUrl = `?${updatedSearchParams.toString()}`;

  if (idData.detail) {
    return (
      <div className={`specie_card ${darkTheme ? 'dark-theme' : ''}`}>
        <h3>Data not found</h3>
        <Link
          to={closeLinkUrl}
          className={`btn closeCardBtn "no-link-style" ${darkTheme ? 'dark-theme' : ''}`}
        >
          Close card
        </Link>
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
      <Link
        to={closeLinkUrl}
        data-testid="close-card-link"
        className={`btn closeCardBtn "no-link-style" ${darkTheme ? 'dark-theme' : ''}`}
      >
        Close card
      </Link>
    </div>
  );
}
