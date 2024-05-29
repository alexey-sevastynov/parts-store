import Styles from '@/styles/modules/header/index.module.scss';

import { useLang } from '@/hooks/useLang';
import { ISubcategory } from '@/types/category';
import React from 'react';

import ListSubSubCategories from './ListSubSubCategories';
import Link from 'next/link';
import { ROUTES } from '@/constants/common';
import { useDispatch } from 'react-redux';
import { closeDropDownCatalog } from '@/context/features/modals/modals';

const ListSubcategories = ({
  subcategories,
  nameCategory,
  idCategory,
}: {
  subcategories: ISubcategory[];
  nameCategory: string;
  idCategory: string;
}) => {
  const dispatch = useDispatch();
  const { lang } = useLang();

  return (
    <ul className={Styles.listSubcategories}>
      {subcategories.map((subcategory) => {
        console.log(subcategory.subSubcategories);

        return (
          <li key={subcategory._id} className={Styles.listSubcategories__item}>
            <Link
              className={Styles.listSubcategories__item_link}
              href={ROUTES.VIEW_SUBCATEGORY_BY_ID(
                nameCategory,
                subcategory.name.en,
                idCategory,
                subcategory._id as string
              )}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(closeDropDownCatalog());
              }}
            >
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
