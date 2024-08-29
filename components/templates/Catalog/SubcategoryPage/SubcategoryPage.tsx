'use client';
import React from 'react';

import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';
import { ICategory } from '@/types/category';

import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import Subcategory from '@/components/modules/Subcategory/Subcategory';

const SubcategoryPage = ({ data }: { data: ICategory }) => {
  const { lang, translations } = useLang();

  const [category, setCategory] = React.useState<ICategory>(data);

  const ADD_CATEGORIES_BREADCRUMBS = [
    {
      id: 1,
      name: translations[lang].main_page.main,
      link: ROUTES.HOME,
    },
    {
      id: 2,
      name: category.name[lang],
    },
  ];

  return (
    <main className='container subcategories-page'>
      <div className='breadcrumbs'>
        <Breadcrumbs items={ADD_CATEGORIES_BREADCRUMBS} />
      </div>

      <Subcategory title={category.name[lang]} data={category} />
    </main>
  );
};

export default SubcategoryPage;
