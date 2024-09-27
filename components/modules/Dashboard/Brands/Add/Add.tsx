import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';

import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import BrandForm from './BrandForm';
import ListAddedBrands from './ListAddedBrands';
import { IBrand } from '@/types/brand';
import { getAllBrands } from '@/actions/brandActions';

const Add = ({ data }: { data: IBrand[]; status: number; msg: string }) => {
  const { lang, translations } = useLang();

  const ADD_BRANDS_BREADCRUMBS = [
    {
      id: 1,
      name: translations[lang].dashboard_page.brands,
      link: ROUTES.BRANDS,
    },
    {
      id: 2,
      name: translations[lang].common.add,
    },
  ];

  const [searchResults, setSearchResults] = React.useState<IBrand[]>(data);

  const getBrands = async () => {
    const res = await getAllBrands();

    setSearchResults(res.data);
  };

  return (
    <section className={Styles.add}>
      <div className={Styles.add__head}>
        <Breadcrumbs items={ADD_BRANDS_BREADCRUMBS} />
      </div>

      <BrandForm updateList={getBrands} />

      <ListAddedBrands
        brands={searchResults}
        isLoading={false}
        updateList={getBrands}
      />
    </section>
  );
};

export default Add;
