import { SIZE_ICON } from '@/constants/common';
import { useLang } from '@/hooks/useLang';
import Styles from '@/styles/modules/dashboard/index.module.scss';

import { CiSearch } from 'react-icons/ci';

const SearchAdmin = () => {
  const { lang, translations } = useLang();

  return (
    <div className={Styles.searchAdmin}>
      <CiSearch className={Styles.searchAdmin__icon} size={SIZE_ICON} />
      <input
        className={Styles.searchAdmin__input}
        type='text'
        placeholder={translations[lang].dashboard_page.search_placeholder}
      />
    </div>
  );
};

export default SearchAdmin;
