'use client';
import React from 'react';

import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import { ISubcategory } from '@/types/category';
import { ILanguageStrings } from '@/types/constants';

import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import SubSubcategory from '@/components/modules/SubSubcategory/SubSubcategory';

const SubSubcategoryPage = ({
  data,
  nameCategory,
  idCategory,
}: {
  data: ISubcategory;
  nameCategory: ILanguageStrings;
  idCategory: string;
}) => {
  const { lang, translations } = useLang();

  const [subcategory, setSubcategory] = React.useState<ISubcategory>(data);

  console.log("subcategory", subcategory);

  console.log(subcategory);
  const ADD_CATEGORIES_BREADCRUMBS = [
    {
      id: 1,
      name: translations[lang].main_page.main,
      link: ROUTES.HOME,
    },
    {
      id: 2,
      name: nameCategory[lang],
      link: ROUTES.VIEW_CATEGORY_BY_ID(nameCategory.en, idCategory),
    },
    {
      id: 3,
      name: subcategory.name[lang],
      link: ROUTES.VIEW_CATEGORY_BY_ID(
        subcategory.name.en,
        subcategory._id as string
      ),
    },
  ];

  return (
    <main className='container subcategories-page'>
      <div className='breadcrumbs'>
        <Breadcrumbs items={ADD_CATEGORIES_BREADCRUMBS} />
      </div>

      {subcategory && (
        <SubSubcategory title={subcategory.name[lang]} data={subcategory} />
      )}
    </main>
  );
};

export default SubSubcategoryPage;
