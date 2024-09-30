import { SWRConfig } from 'swr';

const cache = new Map();
export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
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
