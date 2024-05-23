import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';

import { ROUTES } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import { Breadcrumbs } from '@/components/elements/Breadcrumbs';
import CategoryForm from './CategoryForm';
import ListAddedCategories from './ListAddedCategories';
import { ICategoriesProps } from '@/types/dashboard';
import { ICategory } from '@/types/category';
import { getAllCategories } from '@/actions/categoryActions';
import ServerErrorMsg from '../../ServerErrorMsg';

const Add = ({ data, msg, status }: ICategoriesProps) => {
  const { lang, translations } = useLang();

  const [listCategories, setListCategories] = React.useState<ICategory[]>(data);

  const isLoaded = status === 200;
  const isLoading: boolean = !Object.assign(data);

  const updateListCategories = async (): Promise<void> => {
    try {
      const res = await getAllCategories();

      if (res.categories) {
        setListCategories(res.categories);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching subcategory:', error.message);
      } else {
        console.error('Error fetching subcategory:', error);
      }
      throw error;
    }
  };

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

      {/* if loaded and status = 200 */}
      <span className={Styles.add__line} />
      {!isLoaded ? (
        <ServerErrorMsg msg={msg} status={status} />
      ) : (
        <CategoryForm updateData={updateListCategories} />
      )}

      <span className={Styles.add__line} />
      {!isLoaded ? (
        <ServerErrorMsg msg={msg} status={status} />
      ) : (
        <ListAddedCategories
          data={listCategories}
          updateData={updateListCategories}
          isLoading={isLoading}
        />
      )}
    </section>
  );
};

export default Add;
