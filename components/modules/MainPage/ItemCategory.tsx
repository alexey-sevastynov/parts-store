import Styles from '@/styles/modules/main-page/index.module.scss';
import Link from 'next/link';
import Image from 'next/image';

import { IItemCategoryProps } from '@/types/main-page';
import { FaAngleRight } from 'react-icons/fa6';
import { SIZE_ICON } from '@/constants/common';
import SvgIconUrl from '@/components/elements/SvgIconUrl';

const ItemCategory = ({
  href = '/',
  title,
  icon,
  isWithArrow = false,
}: IItemCategoryProps) => {
  return (
    <li className={Styles.itemCategory}>
      <Link className={Styles.itemCategory__link} href={href}>
        <SvgIconUrl
          className={Styles.itemCategory__link_icon}
          imageUrl={icon}
          alt={title}
          size={SIZE_ICON}
        />

        <p className={Styles.itemCategory__link_title}>{title}</p>

        {isWithArrow && (
          <FaAngleRight className={Styles.itemCategory__link_arrow} size={10} />
        )}
      </Link>
    </li>
  );
};

export default ItemCategory;
