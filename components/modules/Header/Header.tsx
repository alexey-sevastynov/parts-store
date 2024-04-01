import Styles from '@/styles/modules/header/index.module.scss';

import Image from 'next/image';
import Link from 'next/link';

import { RxHamburgerMenu } from 'react-icons/rx';

import LinkIconDescription from '@/components/elements/LinkIconDescription';

const Header = () => {
  return (
    <header className={Styles.header}>
      <div className={Styles.header__burger}>
        <button className={Styles.header__burger_btn}>
          <RxHamburgerMenu className={Styles.header__logo_btn_icon} size={24} />
        </button>
      </div>

      <div className={Styles.header__logo}>
        <Image
          className={Styles.header__logo_img}
          src={'/img/logo.svg'}
          alt='logo'
          width={100}
          height={91}
          priority
        />
      </div>

      <div className={Styles.header__inventory}>
        <LinkIconDescription
          className={Styles.header__inventory_category}
          imageName='catalog'
          href={'/catalog'}
          color='light'
        >
          Catalog
        </LinkIconDescription>

        <LinkIconDescription
          className={Styles.header__inventory_auto}
          imageName='auto'
          href={'/auto'}
          color='light'
        >
          Auto
        </LinkIconDescription>

        <Link className={Styles.header__inventory_sale} href={'/sale'}>
          Sale
        </Link>
      </div>
    </header>
  );
};

export default Header;
