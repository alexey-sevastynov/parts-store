import Styles from '@/styles/modules/header/index.module.scss';

import Link from 'next/link';

import DropDownLang from '@/components/modules/Header/DropDownLang';
import { BiSolidCarGarage } from 'react-icons/bi';
import { MdFavorite } from 'react-icons/md';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { SIZE_ICON } from '@/constants/common';
import DropDownAuth from './DropDownAuth';

const HeaderIconPanel = () => {
  return (
    <div className={Styles.headerIconPanel}>
      <DropDownLang />
      <nav className={Styles.headerIconPanel__navigate}>
        <ul className={Styles.headerIconPanel__navigate_list}>
          <li>
            <Link href='/garage'>
              <BiSolidCarGarage size={SIZE_ICON} />
            </Link>
          </li>
          <li>
            <Link href='/favorites'>
              <MdFavorite size={SIZE_ICON} />
            </Link>
          </li>
          <li>
            <Link href='/cart'>
              <PiShoppingCartSimpleFill size={SIZE_ICON} />
            </Link>
          </li>
          <li className={Styles.headerIconPanel__navigate_list_auth}>
            <DropDownAuth />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderIconPanel;
