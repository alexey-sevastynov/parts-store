'use client';
import { createSlice } from '@reduxjs/toolkit';

export interface ModalsState {
  isOpenDropDownLang: boolean;
  isOpenDropDownAuth: {
    isOpen: boolean;
    isActiveSignIn: boolean;
    isActiveSignUp: boolean;
  };
}

const initialState: ModalsState = {
  isOpenDropDownLang: false,
  isOpenDropDownAuth: {
    isOpen: false,
    isActiveSignIn: true,
    isActiveSignUp: false,
  },
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

    openDropDownAuth: (state) => {
      state.isOpenDropDownAuth = {
        isOpen: true,
        isActiveSignIn: true,
        isActiveSignUp: false,
      };
    },

    closeDropDownAuth: (state) => {
      state.isOpenDropDownAuth = {
        isOpen: false,
        isActiveSignIn: false,
        isActiveSignUp: false,
      };
    },

    openWindowSignIn: (state) => {
      state.isOpenDropDownAuth = {
        isOpen: true,
        isActiveSignIn: true,
        isActiveSignUp: false,
      };
    },

    openWindowSignUp: (state) => {
      state.isOpenDropDownAuth = {
        isOpen: true,
        isActiveSignIn: false,
        isActiveSignUp: true,
      };
    },
  },
});

export const {
  openDropDownLang,
  closeDropDownLang,
  openDropDownAuth,
  closeDropDownAuth,
  openWindowSignIn,
  openWindowSignUp,
} = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
