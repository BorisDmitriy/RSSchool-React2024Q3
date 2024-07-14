import { OneSpecie } from '../types/Types';

export default async function getSpecieAPI(id: string): Promise<OneSpecie> {
  const url = `https://swapi.dev/api/species/${id}`;
  const response = await fetch(url, { method: 'GET' });
  const result = await response.json();
  return result;
}
