import React, { useState } from 'react';
import Styles from '@/styles/modules/header/index.module.scss';
import useSWR from 'swr';
import {
  getAllCategories,
  getCategoryById,
  getSubcategoryById,
} from '@/actions/categoryActions';
import { useLang } from '@/hooks/useLang';
import ItemLinkCategory from '@/components/elements/ItemLinkCategory';
import ListSubcategories from './ListSubcategories';
import { IDropDownCatalogWrapperProps } from '@/types/header';
import { getSubcategories } from '@/utils/dashboards';

const DropDownCatalogWrapper = ({ ...props }: IDropDownCatalogWrapperProps) => {
  const { lang } = useLang();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  // Fetch all categories
  const { data: categories, error: categoriesError } = useSWR(
    'categories',
    () => getAllCategories().then((res) => res.categories),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Fetch selected category when selectedCategoryId changes
  const { data: category, error: categoryError } = useSWR(
    selectedCategoryId ? ['category', selectedCategoryId] : null,
    () =>
      getCategoryById(selectedCategoryId).then((res) => {
        return res.category;
      }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <div className={`${Styles.dropDownCatalogWrapper} container`} {...props}>
      <ul className={`${Styles.dropDownCatalogWrapper__list_categories} `}>
        {categories &&
          Array.isArray(categories) &&
          categories.map((category) => (
            <ItemLinkCategory
              key={category._id}
              icon={category.imageUrl}
              title={category.name[lang]}
              href='/'
              isWithArrow={true}
              onMouseEnter={() => setSelectedCategoryId(category._id as string)}
            />
          ))}
      </ul>

      <div className={Styles.dropDownCatalogWrapper__menu}>
        {category && (
          <ListSubcategories subcategories={category.subcategories} />
        )}
      </div>
    </div>
  );
};

export default DropDownCatalogWrapper;
