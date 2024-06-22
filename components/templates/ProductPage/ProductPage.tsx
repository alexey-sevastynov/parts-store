'use client';

import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import UserInterestPanel from '@/components/modules/MainPage/UserInterestPanel/UserInterestPanel';
import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import { IProduct } from '@/types/goods';

const ProductPage = ({
  data,
}: {
  data: { msg: string; status: number; product?: IProduct };
}) => {
  const { lang, translations } = useLang();

  const PROSUCT_BREADCRUMBS = [
    {
      id: 1,
      name: translations[lang].main_page.main,
      link: ROUTES.HOME,
    },
    {
      id: 2,
      name: data.product?.name[lang] ?? 'Unknown Product',
    },
  ];

  return (
    <main className='container product-page'>
      <div className='breadcrumbs'>
        <Breadcrumbs items={PROSUCT_BREADCRUMBS} />
      </div>
    </main>
  );
};

export default ProductPage;
