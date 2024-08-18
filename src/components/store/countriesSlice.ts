import { createSlice } from '@reduxjs/toolkit';
import { CountriesState } from '../../types/types';

const initialState: CountriesState = {
  allCountries: ['United States', 'Canada', 'Mexico', 'Japan', 'France'],
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    // Reducers to manage countries if needed
  },
});

export default countriesSlice.reducer;
