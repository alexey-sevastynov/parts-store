import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { translationReducer } from './features/translation/translationSlice';

const rootReducer = combineReducers({
  translation: translationReducer,
});

export const store = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof store>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
