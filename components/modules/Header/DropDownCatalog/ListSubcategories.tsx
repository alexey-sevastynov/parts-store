import Styles from '@/styles/modules/header/index.module.scss';
import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useLang } from '@/hooks/useLang';
import { ISubcategoryWithIds } from '@/types/category';
import { ROUTES } from '@/constants/common';
import { closeDropDownCatalog } from '@/context/features/modals/modals';
import ListSubSubCategories from './ListSubSubCategories';

const ListSubcategories = ({
  subcategories,
  nameCategory,
  idCategory,
}: {
  subcategories: ISubcategoryWithIds[];
  nameCategory: string;
  idCategory: string;
}) => {
  const dispatch = useDispatch();
  const { lang } = useLang();

  return (
    <ul className={Styles.listSubcategories}>
      {subcategories.map((subcategory) => {
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
