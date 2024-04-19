import StylesElement from '@/styles/elements/index.module.scss';
import Styles from '@/styles/modules/aside-panel/index.module.scss';

import Link from 'next/link';
import { useLang } from '@/hooks/useLang';

import { SIZE_ICON } from '@/constants/common';
import { FaCar, FaThList } from 'react-icons/fa';

import IconWithTitleCounter from '@/components/elements/IconWithTitleCounter';
import { MdChecklist, MdFavorite } from 'react-icons/md';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';

const ListLinks = () => {
  const { lang, translations } = useLang();
  return (
    <ul className={Styles.listLinks}>
      {/* ___________CATALOG */}
      <li className={Styles.listLinks__item}>
        <Link href={'/catalog'}>
          <IconWithTitleCounter
            image={
              <FaThList
                className={StylesElement.iconWithTitleCounter__image}
                size={SIZE_ICON}
              />
            }
            text={translations[lang].aside_panel_page.product_catalog}
          />
        </Link>
      </li>

      {/* ___________CAR LIST */}
      <li className={Styles.listLinks__item}>
        <Link href={'/car-list'}>
          <IconWithTitleCounter
            image={
              <FaCar
                className={StylesElement.iconWithTitleCounter__image}
                size={SIZE_ICON}
              />
            }
            text={translations[lang].aside_panel_page.car_list}
          />
        </Link>
      </li>

      <span className={Styles.listLinks__divider} />

      {/* ___________FAVORITE LIST */}
      <li className={Styles.listLinks__item}>
        <Link href={'/favorites'}>
          <IconWithTitleCounter
            image={
              <MdFavorite
                className={StylesElement.iconWithTitleCounter__image}
                size={SIZE_ICON}
              />
            }
            text={translations[lang].aside_panel_page.wish_list}
            counter={13}
          />
        </Link>
      </li>

      {/* ___________CART LIST */}
      <li className={Styles.listLinks__item}>
        <Link href={'/cart'}>
          <IconWithTitleCounter
            image={
              <PiShoppingCartSimpleFill
                className={StylesElement.iconWithTitleCounter__image}
                size={SIZE_ICON}
              />
            }
            text={translations[lang].aside_panel_page.cart}
            counter={2}
          />
        </Link>
      </li>

      {/* ___________ORDER LIST */}
      <li className={Styles.listLinks__item}>
        <Link href={'/cart'}>
          <IconWithTitleCounter
            image={
              <MdChecklist
                className={StylesElement.iconWithTitleCounter__image}
                size={SIZE_ICON}
              />
            }
            text={translations[lang].aside_panel_page.my_orders}
          />
        </Link>
      </li>
    </ul>
  );
};

export default ListLinks;
