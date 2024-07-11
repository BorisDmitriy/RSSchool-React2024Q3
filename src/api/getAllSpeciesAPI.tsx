import { ErrResp, OneSpecie } from '../types/Types';

async function getAllSpeciesFromPages(
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
    return getAllSpeciesFromPages(pageData.next, newResults);
  }

  return newResults;
}

export default async function getAllSpecies(): Promise<OneSpecie[] | ErrResp> {
  try {
    const url = 'https://swapi.dev/api/species/';

    return await getAllSpeciesFromPages(url);
  } catch (error) {
    console.error(
      'There has been a problem with your fetch of all species operation:',
      error,
    );
    return (error as Error).message as unknown as ErrResp;
  }
}
