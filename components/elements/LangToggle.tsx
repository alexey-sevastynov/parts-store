'use client';
import Styles from '@/styles/elements/index.module.scss';

import Image from 'next/image';
import React from 'react';

import { useLang } from '@/hooks/useLang';
import { AllowedLangs } from '@/constants/lang';
import { useAppDispatch, useAppSelector } from '@/context/hooks';
import { setLang } from '@/context/features/translation/translationSlice';

import { IoMdClose } from 'react-icons/io';
import { COLORS } from '@/constants/colors';
import {
  closeDropDownLang,
  openDropDownLang,
} from '@/context/features/modals/modals';

const LangToggle = () => {
  const dispatch = useAppDispatch();
  const { lang, translations } = useLang();

  const isOpenDropDownLang = useAppSelector(
    (state) => state.modals.isOpenDropDownLang
  );

  const [selectedOption, setSelectedOption] =
    React.useState<AllowedLangs>(lang);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lang = event.target.value as AllowedLangs;

    dispatch(setLang(lang));
    setSelectedOption(lang);
  };

  return (
    <div className={Styles.langToggle}>
      <Image
        src={'/img/ukraine.svg'}
        alt='ukraine'
        width={12}
        height={12}
        priority
      />
      <button
        className={Styles.langToggle__select}
        onClick={() => dispatch(openDropDownLang())}
      >
        <p className={Styles.langToggle__select_text}>{lang.toUpperCase()}</p>

        <Image src={'/img/arrow-down.svg'} alt='arrow' width={7} height={5} />
      </button>

      {isOpenDropDownLang && (
        <div className={Styles.langToggle__popup}>
          <p className={Styles.langToggle__popup_title}>
            {translations[lang].header.changeLanguage}:
          </p>

          <button
            className={Styles.langToggle__popup_close}
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
          <span className={Styles.langToggle__popup_arrow} />
        </div>
      )}
    </div>
  );
};

export default LangToggle;
