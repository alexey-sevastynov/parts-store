'use client';

import { Provider } from 'react-redux';

import { SessionProvider } from 'next-auth/react';

import { persistor, store } from '@/context/store';
import { PersistGate } from 'redux-persist/integration/react';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default Providers;
