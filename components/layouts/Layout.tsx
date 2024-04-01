'use client';

import Header from '../modules/Header/Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='header-wrapper'>
        <div className='container'>
          <Header />
          {children}
        </div>
      </div>

      {/* Footer here */}
    </>
  );
};

export default Layout;
