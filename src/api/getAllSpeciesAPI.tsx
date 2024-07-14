import { OneSpecie } from '../types/Types';

async function getAllSpeciesFromPages(
  url: string,
  results: OneSpecie[] = [],
): Promise<OneSpecie[]> {
  const response = await fetch(url, { method: 'GET' });

  const pageData = await response.json();

  const newResults = results.concat(pageData.results as OneSpecie[]);

  if (pageData.next) {
    return getAllSpeciesFromPages(pageData.next, newResults);
  }

  return newResults;
}

export default async function getAllSpeciesAPI(): Promise<OneSpecie[]> {
  const url = 'https://swapi.dev/api/species/';
  return getAllSpeciesFromPages(url);
}
