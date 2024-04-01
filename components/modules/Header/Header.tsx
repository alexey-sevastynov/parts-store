import Styles from '@/styles/modules/header/index.module.scss';

import { RxHamburgerMenu } from 'react-icons/rx';

import Logotype from '@/components/elements/Logotype';

import Inventory from './Inventory';

const Header = () => {
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
    </header>
  );
};

export default Header;
