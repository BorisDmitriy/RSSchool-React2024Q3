import { Suspense } from 'react';
import {
  DataSpeciesAndIdProps,
  OneSpecie,
  ResponseSpecies,
} from 'src/types/Types';
import Loading from 'app/loading';
import Client from './Client';

async function getServerSideProps(
  search: string | string[] | undefined,
  id: string | string[] | undefined,
  page: string | string[] | undefined,
): Promise<{ dataSpecies: ResponseSpecies<OneSpecie>; idData: OneSpecie }> {
  const params = new URLSearchParams();

  if (page && !Array.isArray(page)) params.append('page', page);

  if (search && !Array.isArray(search) && search !== '')
    params.append('search', search);

  const responceSearch = await fetch(
    `https://swapi.dev/api/species?${params.toString()}`,
  );
  const responceSearchJson = await responceSearch.json();

  const idData = id ? await fetch(`https://swapi.dev/api/species/${id}`) : '';
  const idDataJson = idData ? await idData.json() : '';

  return { dataSpecies: responceSearchJson, idData: idDataJson };
}

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = searchParams;

  // fetch data
  const { dataSpecies, idData }: DataSpeciesAndIdProps =
    await getServerSideProps(params.search, params.id, params.page);
  console.log('dataSpecies from getServerSideProps');

  return (
    <Suspense fallback={<Loading />}>
      <Client dataSpecies={dataSpecies} idData={idData} />
    </Suspense>
  );
}

export default Page;
