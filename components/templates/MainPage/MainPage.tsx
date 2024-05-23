'use client';

import AsidePanelMain from '@/components/modules/MainPage/AsidePanelMain/AsidePanelMain';
import UserInterestPanel from '@/components/modules/MainPage/UserInterestPanel/UserInterestPanel';
import { ICategory } from '@/types/category';

const MainPage = ({ categories }: { categories: ICategory[] }) => {
  return (
    <main className='container main-page'>
      <AsidePanelMain categories={categories} />

      <UserInterestPanel />
    </main>
  );
};

export default MainPage;
