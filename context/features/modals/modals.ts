'use client';
import { createSlice } from '@reduxjs/toolkit';

export interface ModalsState {
  isOpenDropDownLang: boolean;
}

const initialState: ModalsState = {
  isOpenDropDownLang: false,
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openDropDownLang: (state) => {
      state.isOpenDropDownLang = true;
    },
    closeDropDownLang: (state) => {
      state.isOpenDropDownLang = false;
    },
  },
});

export const { openDropDownLang, closeDropDownLang } = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
