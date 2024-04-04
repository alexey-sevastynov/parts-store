import Styles from '@/styles/modules/header/index.module.scss';

import Link from 'next/link';

import LangToggle from '@/components/elements/LangToggle';
import { BiSolidCarGarage } from 'react-icons/bi';
import { MdFavorite } from 'react-icons/md';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { FaUserLarge } from 'react-icons/fa6';
import DropDownAuth from './DropDownAuth';

const HeaderIconPanel = () => {
  const sizeIcon = 25;
  return (
    <div className={Styles.headerIconPanel}>
      <LangToggle />
      <nav className={Styles.headerIconPanel__navigate}>
        <ul className={Styles.headerIconPanel__navigate_list}>
          <li>
            <Link href='/garage'>
              <BiSolidCarGarage size={sizeIcon} />
            </Link>
          </li>
          <li>
            <Link href='/favorites'>
              <MdFavorite size={sizeIcon} />
            </Link>
          </li>
          <li>
            <Link href='/cart'>
              <PiShoppingCartSimpleFill size={sizeIcon} />
            </Link>
          </li>
          <li className={Styles.headerIconPanel__navigate_list_auth}>
            <Link href='/auth'>
              <FaUserLarge size={sizeIcon} />
            </Link>

            <DropDownAuth />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderIconPanel;
