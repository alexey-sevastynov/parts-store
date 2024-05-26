import {
  getCategoryById,
  getSubSubcategoriesByIds,
  getSubcategoryById,
} from '@/actions/categoryActions';
import { useLang } from '@/hooks/useLang';
import { ICategory, ISubcategory } from '@/types/category';
import React from 'react';
import useSWR from 'swr';
import ListSubSubCategories from './ListSubSubCategories';

const ListSubcategories = ({
  subcategories,
}: {
  subcategories: ISubcategory[];
}) => {
  const { lang, translations } = useLang();

  // const {data} = useSWR(listIdSubcategories, () => getSubSubcategoriesByIds(listIdSubcategories)));

  return (
    <ul>
      {subcategories.map((subcategory) => {
        console.log(subcategory.subSubcategories);

        return (
          <li key={subcategory._id} style={{ color: 'red' }}>
            {subcategory.name[lang]}

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
