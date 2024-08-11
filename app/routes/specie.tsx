import { useLoaderData } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/node';
import App from '../../src/App';
import { ResponseSpecies, OneSpecie } from '../../src/types/Types';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const { searchParams } = url;

  console.log('searchParams', searchParams);

  const search = searchParams.get('search');
  const id = searchParams.get('id');
  const page = searchParams.get('page');

  const params = new URLSearchParams();

  if (page) params.append('page', page);
  if (search) params.append('search', search);

  const responseSearch = await fetch(
    `https://swapi.dev/api/species?${params.toString()}`,
  );
  const dataSpecies: ResponseSpecies<OneSpecie> = await responseSearch.json();

  let idData: OneSpecie | '' = '';
  if (id) {
    const responseId = await fetch(`https://swapi.dev/api/species/${id}`);
    idData = await responseId.json();
  }

  console.log('fetch done');

  return json({ dataSpecies, idData });
};

export default function SpecieRoute() {
  console.log('before fetch');

  const { dataSpecies, idData } = useLoaderData<{
    dataSpecies: ResponseSpecies<OneSpecie>;
    idData: OneSpecie;
  }>();

  return <App dataSpecies={dataSpecies} idData={idData} />;
}
