'use client';

import { configureStore } from '@reduxjs/toolkit';
import { speciesAPI } from './speciesAPI';
import currentPageSpeciesSlice from './currentPageSpeciesSlice';
import selectedItemsSpeciesSlice from './selectedItemsSpeciesSlice';

const store = configureStore({
  reducer: {
    [speciesAPI.reducerPath]: speciesAPI.reducer,
    currentPageSpecies: currentPageSpeciesSlice,
    selectedItemsSpecies: selectedItemsSpeciesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(speciesAPI.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
