import Styles from '@/styles/modules/dashboard/index.module.scss';

import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import { IAddSubcategoriesProps } from '@/types/dashboard';
import SubcategoryForm from './SubcategoryForm';
import ListAddedSubcategories from './ListAddedSubcategories';
import { ISubcategory } from '@/types/category';
import React from 'react';
import { getSubcategories } from '@/utils/dashboards';

const AddSubcategories = ({ msg, status, data }: IAddSubcategoriesProps) => {
  const { lang, translations } = useLang();

  const [listSubcategory, setListSubcategory] = React.useState<ISubcategory[]>(
    data?.subcategories
  );

  const updateListSubcategories = async () => {
    const subcategories = await getSubcategories(data._id || '');

    setListSubcategory(subcategories);
  };

  const ADD_SUBCATEGORIES_BREADCRUMBS = [
    {
      id: 1,
      name: translations[lang].dashboard_page.categories,
      link: ROUTES.CATEGORIES,
    },
    {
      id: 2,
      name: translations[lang].common.add,
      link: ROUTES.CATEGORIES_ADD,
    },
    {
      id: 3,
      name: data?.name[lang] || translations[lang].dashboard_page.category,
    },
  ];

  return (
    <section className={Styles.add}>
      <div className={Styles.add__head}>
        <Breadcrumbs items={ADD_SUBCATEGORIES_BREADCRUMBS} />
      </div>

      <span className={Styles.add__line} />
      {data?._id && (
        <SubcategoryForm
          categoryId={data?._id}
          updateListSubcategories={updateListSubcategories}
        />
      )}

      <span className={Styles.add__line} />

      <ListAddedSubcategories
        data={listSubcategory}
        idCategory={data._id}
        updateListSubcategories={updateListSubcategories}
      />
    </section>
  );
};

export default AddSubcategories;
