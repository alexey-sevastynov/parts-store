import React, { useState } from 'react';
import Styles from '@/styles/modules/header/index.module.scss';
import useSWR from 'swr';
import { getAllCategories, getCategoryById } from '@/actions/categoryActions';
import { useLang } from '@/hooks/useLang';
import ItemLinkCategory from '@/components/elements/ItemLinkCategory';
import ListSubcategories from './ListSubcategories';
import { IDropDownCatalogWrapperProps } from '@/types/header';
import { IoMdClose } from 'react-icons/io';
import { COLORS } from '@/constants/colors';
import { closeDropDownCatalog } from '@/context/features/modals/modals';
import { useAppDispatch } from '@/context/hooks';
import { transformStringToAdressLink } from '@/utils/common';

const DropDownCatalogWrapper = ({ ...props }: IDropDownCatalogWrapperProps) => {
  const dispatch = useAppDispatch();

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

  React.useEffect(() => {
    // Check if categories exist and is not empty
    if (categories && categories.length > 0) {
      setSelectedCategoryId(categories[0]._id as string); // Set selectedCategoryId to the id of the first category
    }
  }, [categories]);

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
              href={`/catalog/${transformStringToAdressLink(category.name.en)}?id=${category._id}`}
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
          <ListSubcategories subcategories={category.subcategories} />
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
