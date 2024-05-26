'use client';
import Styles from '@/styles/modules/header/index.module.scss';

import Link from 'next/link';
import React from 'react';

import { useLang } from '@/hooks/useLang';

import LinkIconDescription from '@/components/elements/LinkIconDescription';
import { useSession } from 'next-auth/react';
import ButtonIconDescription from '@/components/elements/ButtonIconDescription';
import DropDownCatalog from './DropDownCatalog/DropDownCatalog';
import useClickOutside from '@/hooks/useClickOutside';
import {
  closeDropDownAuth,
  closeDropDownCatalog,
  closeDropDownLang,
  openDropDownCatalog,
} from '@/context/features/modals/modals';
import { useAppDispatch, useAppSelector } from '@/context/hooks';

const Inventory = () => {
  const dispatch = useAppDispatch();

  const { status } = useSession();

  const ref = React.useRef<HTMLLIElement>(null);

  const isOpenDropCatalog = useAppSelector(
    (state) => state.modals.isOpenDropCatalog
  );

  useClickOutside(ref, () => {
    dispatch(closeDropDownCatalog());
    console.log('close');
  });

  const { lang, translations } = useLang();

  const isAuthenticated = status === 'authenticated';

  const [isActiveAutoLink, setIsActiveAutoLink] = React.useState<boolean>(true);
  const [isActiveSaleLink, setIsActiveSaleLink] = React.useState<boolean>(true);

  const handleShowDropCatalog = (): void => {
    dispatch(openDropDownCatalog());
    dispatch(closeDropDownLang());
    dispatch(closeDropDownAuth());
  };

  return (
    <nav className={Styles.header__inventory}>
      <ul className={Styles.header__inventory_list}>
        <li
          className={Styles.header__inventory_list_category}
          ref={ref}
          onClick={handleShowDropCatalog}
        >
          <DropDownCatalog />
        </li>

        {isActiveAutoLink && isAuthenticated && (
          <li className={Styles.header__inventory_list_auto}>
            <LinkIconDescription imageName='auto' href={'/auto'} color='light'>
              {translations[lang].header.auto}
            </LinkIconDescription>
          </li>
        )}

        {isActiveSaleLink && (
          <li className={Styles.header__inventory_list_sale}>
            <Link href={'/sale'}> {translations[lang].header.sale}</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Inventory;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
