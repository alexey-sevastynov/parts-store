'use client';

import { useAppSelector } from '@/context/hooks';
import Layout from './Layout';

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const isOpenDropDownLang = useAppSelector(
    (state) => state.modals.isOpenDropDownLang
  );

  return (
    <>
      <Layout>{children}</Layout>

      {/* background, when the language drop-down window is open */}
      <div
        className={`lang-popup-overlay ${isOpenDropDownLang ? 'overlay-active' : ''}`}
      />
    </>
  );
};

export default PagesLayout;
