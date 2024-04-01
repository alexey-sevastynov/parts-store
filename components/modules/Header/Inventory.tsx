import Styles from '@/styles/modules/header/index.module.scss';

import Link from 'next/link';

import LinkIconDescription from '@/components/elements/LinkIconDescription';
import React from 'react';

const Inventory = () => {
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
          Catalog
        </LinkIconDescription>
      </li>

      {isActiveAutoLink && (
        <li className={Styles.header__inventory_auto}>
          <LinkIconDescription imageName='auto' href={'/auto'} color='light'>
            Auto
          </LinkIconDescription>
        </li>
      )}

      {isActiveSaleLink && (
        <li className={Styles.header__inventory_sale}>
          <Link href={'/sale'}>Sale</Link>
        </li>
      )}
    </ul>
  );
};

export default Inventory;
