import Styles from '@/styles/modules/header/index.module.scss';

import ButtonIconDescription from '@/components/elements/ButtonIconDescription';
import { withClickOutside } from '@/components/hocs/withClickOutside';
import { useAppDispatch, useAppSelector } from '@/context/hooks';
import { useLang } from '@/hooks/useLang';
import { IWrappedComponentProps } from '@/types/hocs';
import React, { forwardRef } from 'react';
import DropDownCatalogWrapper from './DropDownCatalogWrapper';
import {
  closeDropDownAuth,
  closeDropDownCatalog,
  closeDropDownLang,
  openDropDownCatalog,
} from '@/context/features/modals/modals';
import { basePropsForMotionDropDown } from '@/constants/motion';
import { motion } from 'framer-motion';
import useClickOutside from '@/hooks/useClickOutside';
import { getAllCategories } from '@/actions/categoryActions';
import { unstable_cache } from 'next/cache';
import useSWR from 'swr';

const DropDownCatalog = () => {
  const { lang, translations } = useLang();

  const isOpenDropCatalog = useAppSelector(
    (state) => state.modals.isOpenDropCatalog
  );

  return (
    <div className={Styles.dropDownCatalog}>
      <ButtonIconDescription imageName='catalog' color='light' type='button'>
        {translations[lang].header.catalog}
      </ButtonIconDescription>

      {isOpenDropCatalog && (
        <motion.div
          className={Styles.dropDownCatalog__wrapper}
          {...basePropsForMotionDropDown}
        >
          <DropDownCatalogWrapper />
        </motion.div>
      )}
    </div>
  );
};

export default DropDownCatalog;
