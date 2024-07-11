import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import getSpecieAPI from '../api/getSpecieAPI';
import { OneSpecie } from '../types/Types';

export default function SpecieCard() {
  const [searchParams] = useSearchParams();
  const speciesName = searchParams.get('speice');

  const [specieData, setSpecieData] = useState<OneSpecie>();
  console.log(speciesName);

  // Fetch and display the details of the species using speciesName
  // ...

  const fetchData = async (id: string) => {
    // setIsLoading(true);
    try {
      const res = await getSpecieAPI(id);
      if (res) {
        setSpecieData(res);
        console.log(specieData);
      }
    } catch (error) {
      console.error('error');
    } finally {
      //   setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch all species or searched species based on searchTerm
    fetchData('1');
  }, []);

  console.log('specieData', specieData);

  return (
    <div className="species_card">
      {/* 
      <h3>Name: {specieData.name}</h3>
      <p>Classification: {specieData.classification}</p>
      <p>Designation: {specieData.designation}</p>
      <p>Average height: {specieData.average_height}</p>
      <p>Skin colors: {specieData.skin_colors}</p>
      <p>Hair colors: {specieData.hair_colors}</p>
      <p>Eye colors: {specieData.eye_colors}</p>
      <p>AverageClifespan: {specieData.average_lifespan}</p>
      <p>Homeworld: {specieData.homeworld}</p>
      <p>Language: {specieData.language}</p>
      <p>Films: {specieData.films}</p>
 */}
      <button type="button" className="btn closeCardBtn">
        Close card
      </button>
    </div>
  );
}
