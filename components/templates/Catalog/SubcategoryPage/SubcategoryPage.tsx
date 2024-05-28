'use client';
import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import { ICategory } from '@/types/category';
import React from 'react';

const SubcategoryPage = ({ data }: { data: ICategory }) => {
  const [category, setCategory] = React.useState<ICategory>(data);

  console.log(category);

  return (
    <main className='container main-page'>
      SubcategoryPage {category.name ? category.name.en : 'sf'}
    </main>
  );
};

export default SubcategoryPage;
