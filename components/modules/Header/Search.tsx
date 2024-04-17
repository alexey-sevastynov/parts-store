'use client';
import { SIZE_ICON } from '@/constants/common';
import Styles from '@/styles/modules/header/index.module.scss';
import { CiSearch } from 'react-icons/ci';
import { FaMicrophone } from 'react-icons/fa6';

const Search = () => {
  return (
    <div className={Styles.search}>
      <div className={Styles.search__field}>
        <input className={Styles.search__field_input} placeholder='Searh...' />
        <CiSearch className={Styles.search__field_icon} size={SIZE_ICON} />
        <div className={Styles.search__field_microphone}>
          <FaMicrophone className={Styles.search__field_microphone_icon} />
        </div>
      </div>

      <div className={Styles.search__button}>Find</div>
    </div>
  );
};

export default Search;
