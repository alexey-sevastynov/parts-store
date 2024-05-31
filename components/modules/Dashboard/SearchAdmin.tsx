import Styles from '@/styles/modules/dashboard/index.module.scss';

import { SIZE_ICON } from '@/constants/common';
import { useLang } from '@/hooks/useLang';

import React from 'react';

import { CiSearch } from 'react-icons/ci';

const SearchAdmin = ({
  onSearch,
  placeholder = 'Search...',
}: {
  onSearch: (searchInput: string) => void;
  placeholder?: string;
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
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchAdmin;
