import { SIZE_ICON } from '@/constants/common';
import { useLang } from '@/hooks/useLang';
import Styles from '@/styles/modules/dashboard/index.module.scss';
import React from 'react';

import { CiSearch } from 'react-icons/ci';

const SearchAdmin = ({
  onSearch,
}: {
  onSearch: (searchInput: string) => void;
}) => {
  const { lang, translations } = useLang();

  const [searchValue, setSearchValue] = React.useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className={Styles.searchAdmin}>
      <CiSearch className={Styles.searchAdmin__icon} size={SIZE_ICON} />
      <input
        className={Styles.searchAdmin__input}
        type='text'
        placeholder={translations[lang].dashboard_page.search_placeholder}
        value={searchValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchAdmin;
