'use client';

import { Provider } from 'react-redux';

import { persistor, store } from '@/context/store';
import { PersistGate } from 'redux-persist/integration/react';
import { createContext } from 'react';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

export default Providers;
