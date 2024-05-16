import Styles from '@/styles/modules/dashboard/index.module.scss';

import React from 'react';

import { useLang } from '@/hooks/useLang';

import Title from '@/components/elements/Title';
import { ICategory } from '@/types/category';
import { getAllCategories } from '@/actions/categoryActions';
import Link from 'next/link';
import { ROUTES } from '@/constants/common';

const ListAddedCategories = ({}) => {
  const { lang, translations } = useLang();

  const [listCategory, setListCategory] =
    React.useState<Omit<ICategory, 'subcategories'>[]>();

  const getLiseCategories = async () => {
    const res = await getAllCategories();

    console.log(res);
    setListCategory(res.categories);
  };

  return (
    <div className={Styles.listAddedCharacteristics}>
      <Title size='sm' className={Styles.listAddedCharacteristics__title}>
        {translations[lang].dashboard_page.list_added_characteristics}
      </Title>

      <button type='button' onClick={getLiseCategories}>
        update
      </button>

      {listCategory && (
        <ul>
          {listCategory?.map(({ _id, name, imageUrl }) => (
            <li key={_id}>
              <Link href={ROUTES.VIEW_SUBCATEGORIES_ADD(_id || 'unknown_id')}>
                {_id}
              </Link>
              <p>english text: {name.en}</p>
              <p>russian text: {name.ru}</p>
              <p>ukraine text: {name.ua}</p>
              <p>image URL: {imageUrl}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListAddedCategories;
