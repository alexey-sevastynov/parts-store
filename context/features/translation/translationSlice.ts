'use client';

import { AllowedLangs, defaultLang } from '@/constants/lang';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Function to get initial language from local storage
const getInitialLang = () => {
  let storedLang = null;

  if (typeof window !== 'undefined') {
    storedLang = localStorage.getItem('lang');
  }

  if (
    storedLang &&
    Object.values(AllowedLangs).includes(storedLang as AllowedLangs)
  ) {
    return storedLang as AllowedLangs;
  }

  return defaultLang;
};

export interface TransletionState {
  currentLanguage: AllowedLangs;
}

const initialState: TransletionState = {
  currentLanguage: getInitialLang(),
};

export const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<AllowedLangs>) => {
      // Update language in state
      state.currentLanguage = action.payload;
      // Save language to local storage
      localStorage.setItem('lang', action.payload);
    },
  },
});

export const { setLang } = translationSlice.actions;

export const translationReducer = translationSlice.reducer;
