'use client';

import AsidePanelMain from '@/components/modules/MainPage/AsidePanelMain/AsidePanelMain';
import UserInterestPanel from '@/components/modules/MainPage/UserInterestPanel/UserInterestPanel';

const MainPage = () => {
  return (
    <main className='container main-page'>
      <AsidePanelMain />
      <UserInterestPanel />
    </main>
  );
};

export default MainPage;
