import Styles from '@/styles/modules/dashboard/index.module.scss';

import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import Link from 'next/link';

import { COLORS } from '@/constants/colors';
import { AllowedLangs } from '@/constants/lang';
import { ROUTES, SIZE_ICON, SIZE_ICON_BIG } from '@/constants/common';

import { motion } from 'framer-motion';
import { deleteItemsTableMotion } from '@/constants/motion';
import { ICategory } from '@/types/category';
import { FaTools } from 'react-icons/fa';
import { RotatingLines } from 'react-loader-spinner';
import SvgIconUrl from '@/components/elements/SvgIconUrl';

interface ICategoryRowProps {
  category: ICategory;
  isChecked: boolean;
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void;
  lang: AllowedLangs;
}

const CategoryRow: React.FC<ICategoryRowProps> = ({
  category,
  isChecked,
  handleCheckboxChange,
  lang,
}) => {
  const { _id, subcategories, name } = category;

  return (
    <motion.tr
      key={_id}
      className={Styles.categoriesTable__body}
      style={isChecked ? { backgroundColor: COLORS.grey } : {}}
      {...deleteItemsTableMotion}
    >
      {/* checkbox */}
      <td
        className={`${Styles.categoriesTable__body_checkbox} ${
          isChecked && Styles.select
        }`}
      >
        <input
          type='checkbox'
          name={_id}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </td>

      {/* icon */}
      <td>
        <SvgIconUrl
          className={`${Styles.categoriesTable__body_icon} ${isChecked && Styles.white_icon}`}
          imageUrl={category.imageUrl}
          alt={category.name[lang]}
          size={SIZE_ICON_BIG}
        />
      </td>

      {/* name category */}
      <td className={Styles.categoriesTable__body_name_category}>
        <Link href={ROUTES.VIEW_CATEGORIES_BY_ID(_id || 'error')}>
          {name[lang]}
        </Link>
      </td>

      {/* value category */}
      <td className={Styles.categoriesTable__body_list_categories}>
        {subcategories.map((item, index, array) => {
          // Check if there is a translation for the current language
          if (item.name.hasOwnProperty(lang)) {
            return (
              <React.Fragment key={item._id}>
                <p
                  className={Styles.categoriesTable__body_list_categories_item}
                >
                  {item.name[lang]}
                </p>
                {/* Add comma if not the last item */}
                {index !== array.length - 1 && ', '}
              </React.Fragment>
            );
          }
          // If there is no translation for the current language, return null
          return null;
        })}
      </td>
    </motion.tr>
  );
};

export default CategoryRow;
