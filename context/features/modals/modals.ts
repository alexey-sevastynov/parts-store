'use client';
import { createSlice } from '@reduxjs/toolkit';

export interface ModalsState {
  isOpenDropDownLang: boolean;
  isOpenDropDownAuth: {
    isOpen: boolean;
    isActiveSignIn: boolean;
    isActiveSignUp: boolean;
    isActiveRemindPassword: boolean;
  };

  isOpenChangePassword: boolean;
  isOpenDeleteUser: boolean;
  isOpenAsidePanel: boolean;
  isOpenDropCatalog: boolean;
}

const initialState: ModalsState = {
  isOpenDropDownLang: false,
  isOpenDropDownAuth: {
    isOpen: false,
    isActiveSignIn: true,
    isActiveSignUp: false,
    isActiveRemindPassword: false,
  },

  isOpenChangePassword: false,
  isOpenDeleteUser: false,
  isOpenAsidePanel: true,
  isOpenDropCatalog: true,
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
        isActiveRemindPassword: false,
      };
    },

    closeDropDownAuth: (state) => {
      state.isOpenDropDownAuth = {
        isOpen: false,
        isActiveSignIn: false,
        isActiveSignUp: false,
        isActiveRemindPassword: false,
      };
    },

    openWindowSignIn: (state) => {
      state.isOpenDropDownAuth = {
        isOpen: true,
        isActiveSignIn: true,
        isActiveSignUp: false,
        isActiveRemindPassword: false,
      };
    },

    openWindowSignUp: (state) => {
      state.isOpenDropDownAuth = {
        isOpen: true,
        isActiveSignIn: false,
        isActiveSignUp: true,
        isActiveRemindPassword: false,
      };
    },

    openWindowRemindPassword: (state) => {
      state.isOpenDropDownAuth = {
        isOpen: true,
        isActiveSignIn: false,
        isActiveSignUp: false,
        isActiveRemindPassword: true,
      };
    },

    openPopupWindowChangePassword: (state) => {
      state.isOpenChangePassword = true;
    },
    closePopupWindowChangePassword: (state) => {
      state.isOpenChangePassword = false;
    },

    openPopupWindowDeleteUser: (state) => {
      state.isOpenDeleteUser = true;
    },
    closePopupWindowDeleteUser: (state) => {
      state.isOpenDeleteUser = false;
    },
    openPopupAsidePanel: (state) => {
      state.isOpenAsidePanel = true;
    },
    closePopupAsidePanel: (state) => {
      state.isOpenAsidePanel = false;
    },

    openDropDownCatalog: (state) => {
      state.isOpenDropCatalog = true;
    },
    closeDropDownCatalog: (state) => {
      state.isOpenDropCatalog = false;
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
  openPopupWindowChangePassword,
  closePopupWindowChangePassword,
  openWindowRemindPassword,
  openPopupWindowDeleteUser,
  closePopupWindowDeleteUser,
  openPopupAsidePanel,
  closePopupAsidePanel,
  openDropDownCatalog,
  closeDropDownCatalog,
} = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
