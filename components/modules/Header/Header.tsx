import Styles from '@/styles/modules/header/index.module.scss';

import { RxHamburgerMenu } from 'react-icons/rx';

import Logotype from '@/components/elements/Logotype';

import Inventory from './Inventory';
import HeaderIconPanel from './HeaderIconPanel';
import Search from './Search';
import { useAppDispatch } from '@/context/hooks';
import { openPopupAsidePanel } from '@/context/features/modals/modals';
import { addOverflowHiddenToBody } from '@/utils/common';

const Header = () => {
  const dispatch = useAppDispatch();

  return (
    <header className={Styles.header}>
      <div className={`container ${Styles.header__container}`}>
        <div className={Styles.header__burger}>
          <button
            className={Styles.header__burger_btn}
            onClick={() => {
              dispatch(openPopupAsidePanel());
              addOverflowHiddenToBody();
            }}
          >
            <RxHamburgerMenu
              className={Styles.header__logo_btn_icon}
              size={24}
            />
          </button>
        </div>
        <div className={Styles.header__logo}>
          <Logotype className={Styles.header__logo_img} />
        </div>
        <Inventory />
        <Search />
        <HeaderIconPanel />{' '}
      </div>
    </header>
  );
};

export default Header;
