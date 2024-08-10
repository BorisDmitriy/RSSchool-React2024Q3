'use client';

import { configureStore } from '@reduxjs/toolkit';
import selectedItemsSpeciesSlice from './selectedItemsSpeciesSlice';

const store = configureStore({
  reducer: {
    selectedItemsSpecies: selectedItemsSpeciesSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
