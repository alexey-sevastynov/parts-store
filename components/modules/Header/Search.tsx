'use client';

import Styles from '@/styles/modules/header/index.module.scss';

import { SIZE_ICON } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import { CiSearch } from 'react-icons/ci';
import { FaMicrophone } from 'react-icons/fa6';

const Search = () => {
  const { lang, translations } = useLang();
  return (
    <div className={Styles.search}>
      <div className={Styles.search__field}>
        <input
          className={Styles.search__field_input}
          placeholder={`${translations[lang].header.search}...`}
        />
        <CiSearch className={Styles.search__field_icon} size={SIZE_ICON} />
        <div className={Styles.search__field_microphone}>
          <FaMicrophone className={Styles.search__field_microphone_icon} />
        </div>
      </div>

      <button className={Styles.search__button}>
        {translations[lang].header.find}
      </button>
    </div>
  );
};

export default Search;
