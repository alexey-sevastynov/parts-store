import Styles from '@/styles/modules/header/index.module.scss';

import Link from 'next/link';

import DropDownLang from '@/components/modules/Header/DropDownLang';
import { BiSolidCarGarage } from 'react-icons/bi';
import { MdDashboardCustomize, MdFavorite } from 'react-icons/md';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { SIZE_ICON } from '@/constants/common';
import DropDownAuth from './DropDownAuth';
import { useSession } from 'next-auth/react';
import { RiAdminFill } from 'react-icons/ri';

const HeaderIconPanel = () => {
  const { status } = useSession();

  const isAuthenticated = status === 'authenticated';

  return (
    <div className={Styles.headerIconPanel}>
      <DropDownLang />
      <nav className={Styles.headerIconPanel__navigate}>
        <ul className={Styles.headerIconPanel__navigate_list}>
          {isAuthenticated && (
            <>
              <li className={Styles.headerIconPanel__navigate_list_garage}>
                <Link href='/garage'>
                  <BiSolidCarGarage size={SIZE_ICON} />
                </Link>
              </li>
              <li className={Styles.headerIconPanel__navigate_list_favorite}>
                <Link href='/favorites'>
                  <MdFavorite size={SIZE_ICON} />
                </Link>
              </li>
            </>
          )}

          <li className={Styles.headerIconPanel__navigate_list_cart}>
            <Link href='/dashboard/customers'>
              <PiShoppingCartSimpleFill size={SIZE_ICON} />
            </Link>
          </li>
          {/* <li>
            <Link href='/dashboard'>
              <MdDashboardCustomize size={SIZE_ICON} />
            </Link>
          </li> */}

          {!isAuthenticated && (
            <li className={Styles.headerIconPanel__navigate_list_auth}>
              <DropDownAuth />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderIconPanel;
