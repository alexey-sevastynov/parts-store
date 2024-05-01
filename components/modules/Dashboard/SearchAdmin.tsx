import { SIZE_ICON } from '@/constants/common';
import Styles from '@/styles/modules/dashboard/index.module.scss';

import { CiSearch } from 'react-icons/ci';

const SearchAdmin = () => {
  return (
    <div className={Styles.searchAdmin}>
      <CiSearch className={Styles.searchAdmin__icon} size={SIZE_ICON} />
      <input
        className={Styles.searchAdmin__input}
        type='text'
        placeholder='Search...'
      />
    </div>
  );
};

export default SearchAdmin;
