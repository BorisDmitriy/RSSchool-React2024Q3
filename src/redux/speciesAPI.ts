import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const speciesAPI = createApi({
  reducerPath: 'speciesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (build) => ({
    getSpecies: build.query({
      query: ({ page = 1, searchTerm }) => {
        const params = new URLSearchParams();
        if (page) params.append('page', page);
        if (searchTerm) params.append('search', searchTerm);

        return `species?${params.toString()}`;
      },
    }),

    getOneSpecie: build.query({
      query: (id) => `species/${id}`,
    }),
  }),
});

export const { useGetSpeciesQuery, useGetOneSpecieQuery } = speciesAPI;
