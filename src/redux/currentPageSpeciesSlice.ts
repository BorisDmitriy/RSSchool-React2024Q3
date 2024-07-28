import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OneSpecie, ResponseSpecies } from '../types/Types';

type SpeciesState = {
  list: OneSpecie[];
};
const initialState: SpeciesState = {
  list: [],
};

const currentPageSpeciesSlice = createSlice({
  name: 'currentPageSpecies',
  initialState,
  reducers: {
    addCurrentPageSpecies(
      state,
      action: PayloadAction<ResponseSpecies<OneSpecie>>,
    ) {
      state.list.splice(0, state.list.length, ...action.payload.results);
    },
  },
});

export const { addCurrentPageSpecies } = currentPageSpeciesSlice.actions;

export default currentPageSpeciesSlice.reducer;
