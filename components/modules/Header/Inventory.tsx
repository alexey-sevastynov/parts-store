import Styles from '@/styles/modules/header/index.module.scss';

import Link from 'next/link';

import LinkIconDescription from '@/components/elements/LinkIconDescription';

const Inventory = () => {
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

      <li className={Styles.header__inventory_auto}>
        <LinkIconDescription imageName='auto' href={'/auto'} color='light'>
          Auto
        </LinkIconDescription>
      </li>

      <li className={Styles.header__inventory_sale}>
        <Link href={'/sale'}>Sale</Link>
      </li>
    </ul>
  );
};

export default Inventory;
