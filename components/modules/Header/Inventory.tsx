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
    <ul className={Styles.header__inventory}>
      <li className={Styles.header__inventory_category}>
        <LinkIconDescription
          imageName='catalog'
          href={'/catalog'}
          color='light'
        >
          {translations[lang].header.catalog}
        </LinkIconDescription>
      </li>

      {isActiveAutoLink && (
        <li className={Styles.header__inventory_auto}>
          <LinkIconDescription imageName='auto' href={'/auto'} color='light'>
            {translations[lang].header.auto}
          </LinkIconDescription>
        </li>
      )}

      {isActiveSaleLink && (
        <li className={Styles.header__inventory_sale}>
          <Link href={'/sale'}> {translations[lang].header.sale}</Link>
        </li>
      )}
    </ul>
  );
};

export default Inventory;
