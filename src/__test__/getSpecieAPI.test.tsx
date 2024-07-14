import getSpecieAPI from '../api/getSpecieAPI';
import { OneSpecie } from '../types/Types';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        name: 'Human2',
        classification: 'Mammal',
        designation: 'Sentient',
        average_height: '180',
        skin_colors: 'caucasian, black, asian, hispanic',
        hair_colors: 'blonde, brown, black, red',
        eye_colors: 'brown, blue, green, hazel',
        average_lifespan: '120',
        homeworld: 'Earth',
        language: 'various',
        people: [],
        films: [],
        created: '2023-01-01T00:00:00Z',
        edited: '2023-01-01T00:00:00Z',
        url: 'http://swapi.dev/api/species/1/',
      }),
  }),
) as jest.Mock;

describe('getSpecieAPI', () => {
  it('fetches and returns species data', async () => {
    const specieId = '1';

    const result = await getSpecieAPI(specieId);

    const expectedResult: OneSpecie = {
      name: 'Human2',
      classification: 'Mammal',
      designation: 'Sentient',
      average_height: '180',
      skin_colors: 'caucasian, black, asian, hispanic',
      hair_colors: 'blonde, brown, black, red',
      eye_colors: 'brown, blue, green, hazel',
      average_lifespan: '120',
      homeworld: 'Earth',
      language: 'various',
      people: [],
      films: [],
      created: '2023-01-01T00:00:00Z',
      edited: '2023-01-01T00:00:00Z',
      url: `http://swapi.dev/api/species/${specieId}/`,
    };

    expect(result).toEqual(expectedResult);
  });
});
