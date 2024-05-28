import Styles from '@/styles/modules/header/index.module.scss';
import React from 'react';

import { SWRResponse } from 'swr';

import { basePropsForMotionDropDown } from '@/constants/motion';
import { motion } from 'framer-motion';

import { useAppSelector } from '@/context/hooks';
import { useLang } from '@/hooks/useLang';
import { IDropDownCatalogProps } from '@/types/header';

import DropDownCatalogWrapper from './DropDownCatalogWrapper';
import ButtonIconDescription from '@/components/elements/ButtonIconDescription';

const DropDownCatalog = ({
  categories,
  getCategoryByIdWithFallback,
}: IDropDownCatalogProps) => {
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
          <DropDownCatalogWrapper
            categories={categories}
            getCategoryByIdWithFallback={getCategoryByIdWithFallback}
          />
        </motion.div>
      )}
    </div>
  );
};

export default DropDownCatalog;
