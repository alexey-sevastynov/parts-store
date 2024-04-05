import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { translationReducer } from './features/translation/translationSlice';
import { persistStore, persistReducer, WebStorage } from 'redux-persist'; // Импорт WebStorage добавлен здесь
import { modalsReducer } from './features/modals/modals';

const createNoopStorage = () => {
  return {
    getItem: (_key: string): Promise<string | null> => {
      return Promise.resolve(null);
    },
    setItem: (key: string, value: string): Promise<void> => {
      return Promise.resolve();
    },
    removeItem: (_key: string): Promise<void> => {
      return Promise.resolve();
    },
  };
};

const webStorage: WebStorage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

export const persistConfig = {
  key: 'root',
  storage: webStorage,
};

const rootReducer = combineReducers({
  translation: translationReducer,
  modals: modalsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
