'use client';
import Styles from '@/styles/modules/header/index.module.scss';

import Image from 'next/image';
import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

import { AllowedLangs } from '@/constants/lang';
import { COLORS } from '@/constants/colors';
import { basePropsForMotionDropDown } from '@/constants/motion';

import { useLang } from '@/hooks/useLang';
import { useAppDispatch, useAppSelector } from '@/context/hooks';

import { setLang } from '@/context/features/translation/translationSlice';
import {
  closeDropDownLang,
  openDropDownLang,
} from '@/context/features/modals/modals';

import { IoMdClose } from 'react-icons/io';
import { IWrappedComponentProps } from '@/types/hocs';
import { withClickOutside } from '@/components/hocs/withClickOutside';

const DropDownLang = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const dispatch = useAppDispatch();
    const { lang, translations } = useLang();
    // const dropdownRef = React.useRef(null);

    const isOpenDropDownLang = useAppSelector(
      (state) => state.modals.isOpenDropDownLang
    );

    // useClickOutside(dropdownRef, () => {
    //   dispatch(closeDropDownLang());
    // });

    const [selectedOption, setSelectedOption] =
      React.useState<AllowedLangs>(lang);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const lang = event.target.value as AllowedLangs;

      dispatch(setLang(lang));
      setSelectedOption(lang);
    };

    return (
      <div className={Styles.dropDownLang}>
        {lang !== 'ru' ? (
          <Image
            src={'/img/ukraine.svg'}
            alt='ukraine'
            width={20}
            height={20}
            priority
          />
        ) : (
          <Image
            src={'/img/clown.png'}
            alt='ukraine'
            width={20}
            height={20}
            priority
          />
        )}

        <button
          className={Styles.dropDownLang__select}
          onClick={() => dispatch(openDropDownLang())}
        >
          <p className={Styles.dropDownLang__select_text}>
            {lang.toUpperCase()}
          </p>

          <Image src={'/img/arrow-down.svg'} alt='arrow' width={7} height={5} />
        </button>

        {isOpenDropDownLang && (
          <motion.div
            className={Styles.dropDownLang__popup}
            ref={ref}
            onMouseLeave={() => dispatch(closeDropDownLang())}
            {...basePropsForMotionDropDown}
          >
            <p className={Styles.dropDownLang__popup_title}>
              {translations[lang].header.changeLanguage}:
            </p>

            <button
              className={Styles.dropDownLang__popup_close}
              onClick={() => dispatch(closeDropDownLang())}
            >
              <IoMdClose color={COLORS.blackIcon} />
            </button>

            <label>
              <input
                type='radio'
                value='ua'
                checked={selectedOption === 'ua'}
                onChange={handleOptionChange}
              />
              {translations[lang].common.ua} - UA
            </label>
            <label>
              <input
                type='radio'
                value='ru'
                checked={selectedOption === 'ru'}
                onChange={handleOptionChange}
              />
              {translations[lang].common.ru} - RU
            </label>
            <label>
              <input
                type='radio'
                value='en'
                checked={selectedOption === 'en'}
                onChange={handleOptionChange}
              />
              {translations[lang].common.en} - EN
            </label>
            <span className={Styles.dropDownLang__popup_arrow} />
          </motion.div>
        )}
      </div>
    );
  }
);

DropDownLang.displayName = 'DropDownLang';

export default withClickOutside(DropDownLang);
