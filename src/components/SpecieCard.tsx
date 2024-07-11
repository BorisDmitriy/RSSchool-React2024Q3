import { Link, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import getSpecieAPI from '../api/getSpecieAPI';
import { OneSpecie } from '../types/Types';

export default function SpecieCard() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const currentSearch = location.search;

  const [specieData, setSpecieData] = useState<OneSpecie>();
  console.log(id);

  const fetchData = useCallback(
    async (ids: string) => {
      setIsLoading(true);
      try {
        console.log('id', id);

        const res = await getSpecieAPI(ids);
        if (res) {
          setSpecieData(res);
        }
      } catch (error) {
        console.error('error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [id],
  );

  useEffect(() => {
    if (id) {
      fetchData(id.toString());
    }
  }, [id, fetchData]);

  console.log('specieData', specieData);

  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="specie_card">
      <h3>Name: {specieData?.name}</h3>
      <p>Classification: {specieData?.classification}</p>
      <p>Designation: {specieData?.designation}</p>
      <p>Average height: {specieData?.average_height}</p>
      <p>Skin colors: {specieData?.skin_colors}</p>
      <p>Hair colors: {specieData?.hair_colors}</p>
      <p>Eye colors: {specieData?.eye_colors}</p>
      <p>AverageClifespan: {specieData?.average_lifespan}</p>
      <p>Language: {specieData?.language}</p>

      <Link className="no-link-style" to={`/specie/${currentSearch}`}>
        <button type="button" className="btn closeCardBtn">
          Close card
        </button>
      </Link>
    </div>
  );
}
