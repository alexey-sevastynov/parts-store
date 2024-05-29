import Styles from '@/styles/modules/header/index.module.scss';

import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

import { useLang } from '@/hooks/useLang';
import { IDropDownCatalogWrapperProps } from '@/types/header';
import { COLORS } from '@/constants/colors';
import { closeDropDownCatalog } from '@/context/features/modals/modals';
import { useAppDispatch } from '@/context/hooks';

import ItemLinkCategory from '@/components/elements/ItemLinkCategory';
import ListSubcategories from './ListSubcategories';
import { ROUTES } from '@/constants/common';

const DropDownCatalogWrapper = ({
  categories,
  getCategoryByIdWithFallback,
  ...props
}: IDropDownCatalogWrapperProps) => {
  const dispatch = useAppDispatch();

  const { lang } = useLang();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  const { data: category, error: categoryError } =
    getCategoryByIdWithFallback(selectedCategoryId);

  React.useEffect(() => {
    // Check if categories exist and is not empty
    if (categories && categories.length > 0) {
      setSelectedCategoryId(categories[0]._id as string); // Set selectedCategoryId to the id of the first category
    }
  }, [categories]);

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
              href={ROUTES.VIEW_CATEGORY_BY_ID(
                category.name.en,
                category._id as string
              )}
              isWithArrow={true}
              onMouseEnter={() => setSelectedCategoryId(category._id as string)}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(closeDropDownCatalog());
              }}
            />
          ))}
      </ul>

      <div className={Styles.dropDownCatalogWrapper__menu}>
        {category && (
          <ListSubcategories
            subcategories={category.subcategories}
            nameCategory={category.name.en}
            idCategory={category._id}
          />
        )}
      </div>

      <button
        className={Styles.dropDownCatalogWrapper__close}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(closeDropDownCatalog());
          console.log('closeDropDownCatalog');
        }}
      >
        <IoMdClose size={24} color={COLORS.blackFont} />
      </button>
    </div>
  );
};

export default DropDownCatalogWrapper;
