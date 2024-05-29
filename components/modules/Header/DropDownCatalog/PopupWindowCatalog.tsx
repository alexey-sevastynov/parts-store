import Styles from '@/styles/modules/header/index.module.scss';

import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaAngleLeft } from 'react-icons/fa6';

import { useLang } from '@/hooks/useLang';

import { COLORS } from '@/constants/colors';

import { closeDropDownCatalog } from '@/context/features/modals/modals';
import { useAppDispatch } from '@/context/hooks';

import { ILanguageStrings } from '@/types/constants';
import { IPopupWindowCatalogProps } from '@/types/header';

import Title from '@/components/elements/Title';
import ItemLinkCategory from '@/components/elements/ItemLinkCategory';
import ListSubcategories from './ListSubcategories';
import { motion } from 'framer-motion';
import { basePropsForMotionDropDown } from '@/constants/motion';

const PopupWindowCatalog = React.forwardRef<
  HTMLDivElement,
  IPopupWindowCatalogProps
>(({ categories, getCategoryByIdWithFallback }, ref) => {
  const dispatch = useAppDispatch();
  const { lang, translations } = useLang();

  const [selectCategory, setSelectCategory] = React.useState<{
    name: ILanguageStrings;
    id: string;
  } | null>(null);

  const { data: category, error: categoryError } = getCategoryByIdWithFallback(
    selectCategory?.id || ''
  );

  return (
    <motion.div
      className={Styles.popupWindowCatalog}
      ref={ref}
      {...basePropsForMotionDropDown}
    >
      <div className={Styles.popupWindowCatalog__title}>
        <Title size='sm'>
          {selectCategory ? selectCategory.name[lang] : 'Каталог'}
        </Title>
        <button
          className={Styles.popupWindowCatalog__title_close}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(closeDropDownCatalog());
          }}
        >
          <IoMdClose size={24} color={COLORS.blackFont} />
        </button>
      </div>

      {selectCategory && (
        <>
          <div className={Styles.popupWindowCatalog__back}>
            <button
              className={Styles.popupWindowCatalog__back_btn}
              onClick={() => setSelectCategory(null)}
            >
              <FaAngleLeft size={10} />
              {translations[lang].aside_panel_page.all_categories}
            </button>
          </div>
          <div className={Styles.popupWindowCatalog__menu}>
            {category && (
              <ListSubcategories
                subcategories={category.subcategories}
                nameCategory={category.name.en}
                idCategory={category._id}
              />
            )}
          </div>
        </>
      )}

      {!selectCategory && (
        <ul className={`${Styles.popupWindowCatalog__list_categories} `}>
          {categories.map((category) => (
            <ItemLinkCategory
              key={category._id}
              icon={category.imageUrl}
              title={category.name[lang]}
              isWithArrow={true}
              onClick={() =>
                setSelectCategory({
                  name: category.name,
                  id: category._id as string,
                })
              }
            />
          ))}
        </ul>
      )}
    </motion.div>
  );
});

export default PopupWindowCatalog;
