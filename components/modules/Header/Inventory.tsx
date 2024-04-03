'use client';
import Styles from '@/styles/modules/header/index.module.scss';

import Link from 'next/link';
import React from 'react';

import { useLang } from '@/hooks/useLang';

import LinkIconDescription from '@/components/elements/LinkIconDescription';

const Inventory = () => {
  const { lang, translations } = useLang();

  const [isActiveAutoLink, setIsActiveAutoLink] = React.useState<boolean>(true);
  const [isActiveSaleLink, setIsActiveSaleLink] = React.useState<boolean>(true);

  return (
    <nav className={Styles.header__inventory}>
      <ul className={Styles.header__inventory_list}>
        <li className={Styles.header__inventory_list_category}>
          <LinkIconDescription
            imageName='catalog'
            href={'/catalog'}
            color='light'
          >
            {translations[lang].header.catalog}
          </LinkIconDescription>
        </li>

        {isActiveAutoLink && (
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
