import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';

import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import CategoryForm from './CategoryForm';
import ListAddedCategories from './ListAddedCategories';

const Add = () => {
  const { lang, translations } = useLang();

  const ADD_CATEGORIES_BREADCRUMBS = [
    {
      id: 1,
      name: translations[lang].dashboard_page.categories,
      link: ROUTES.CATEGORIES,
    },
    {
      id: 2,
      name: translations[lang].common.add,
    },
  ];

  return (
    <section className={Styles.add}>
      <div className={Styles.add__head}>
        <Breadcrumbs items={ADD_CATEGORIES_BREADCRUMBS} />
      </div>

      <CategoryForm />

      <ListAddedCategories />
    </section>
  );
};

export default Add;
