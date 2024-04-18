import Styles from '@/styles/modules/header/index.module.scss';

import { RxHamburgerMenu } from 'react-icons/rx';

import Logotype from '@/components/elements/Logotype';

import Inventory from './Inventory';
import HeaderIconPanel from './HeaderIconPanel';
import Search from './Search';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { BREAKPOINTS } from '@/constants/breakpoints';

const Header = () => {
  const isMedia1200 = useMediaQuery(BREAKPOINTS.xl);

  return (
    <header className={Styles.header}>
      <div className={Styles.header__burger}>
        <button className={Styles.header__burger_btn}>
          <RxHamburgerMenu className={Styles.header__logo_btn_icon} size={24} />
        </button>
      </div>
      <div className={Styles.header__logo}>
        <Logotype className={Styles.header__logo_img} />
      </div>
      <Inventory />
      <Search />
      <HeaderIconPanel />
    </header>
  );
};

export default Header;
