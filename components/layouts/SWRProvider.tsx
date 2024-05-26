import { SWRConfig } from 'swr';

const cache = new Map();
export const SWRProvider = ({ children }: any) => {
  return (
    <SWRConfig
      value={{
        provider: () => cache,
      }}
    >
      {children}
    </SWRConfig>
  );
};
