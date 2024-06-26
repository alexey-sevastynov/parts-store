'use client';

import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import NavProduct from '@/components/modules/ItemProduct/NavProduct/NavProduct';
import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import { IProduct } from '@/types/goods';

const ItemProductLayout = ({
  data,
  children,
}: {
  data: { msg: string; status: number; product?: IProduct };
  children: React.ReactNode;
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
    <main className='container'>
      <div className='breadcrumbs'>
        <Breadcrumbs items={PROSUCT_BREADCRUMBS} />
      </div>

      {data.product?._id && (
        <NavProduct
          linkAllAboutProduct={ROUTES.ITEM_PRODUCT(data.product?._id)}
        />
      )}

      {children}
    </main>
  );
};

export default ItemProductLayout;
