import { ErrResponse, OneSpecie } from '../types/Types';

async function getAllSpecies(
  url: string,
  results: OneSpecie[] = [],
): Promise<OneSpecie[]> {
  const response = await fetch(url, { method: 'GET' });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const pageData = await response.json();
  const newResults = results.concat(pageData.results as OneSpecie[]);

  if (pageData.next) {
    return getAllSpecies(pageData.next, newResults);
  }

  return newResults;
}

export default async function getSpecies(
  searchData?: string,
): Promise<OneSpecie[] | ErrResponse> {
  try {
    const baseUrl = 'https://swapi.dev/api/species/';
    const url = searchData ? `${baseUrl}?search=${searchData}` : baseUrl;

    return await getAllSpecies(url);
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return (error as Error).message as unknown as ErrResponse;
  }
}
