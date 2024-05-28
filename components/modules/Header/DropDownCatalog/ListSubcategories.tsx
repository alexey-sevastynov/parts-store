import Styles from '@/styles/modules/header/index.module.scss';

import { useLang } from '@/hooks/useLang';
import { ISubcategory } from '@/types/category';
import React from 'react';

import ListSubSubCategories from './ListSubSubCategories';
import Link from 'next/link';

const ListSubcategories = ({
  subcategories,
}: {
  subcategories: ISubcategory[];
}) => {
  const { lang, translations } = useLang();

  return (
    <ul className={Styles.listSubcategories}>
      {subcategories.map((subcategory) => {
        console.log(subcategory.subSubcategories);

        return (
          <li key={subcategory._id} className={Styles.listSubcategories__item}>
            <Link className={Styles.listSubcategories__item_link} href={`/`}>
              {subcategory.name[lang]}
            </Link>

            <ListSubSubCategories
              subSubcategoryIds={subcategory.subSubcategories}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ListSubcategories;
