import Styles from '@/styles/elements/index.module.scss';
import Link from 'next/link';

import { IItemLinkCategoryProps } from '@/types/main-page';
import { FaAngleRight } from 'react-icons/fa6';
import { SIZE_ICON } from '@/constants/common';
import SvgIconUrl from '@/components/elements/SvgIconUrl';

const ItemLinkCategory = ({
  href = '/',
  title,
  icon,
  isWithArrow = false,
  ...props
}: IItemLinkCategoryProps) => {
  return (
    <li className={Styles.itemLinkCategory} {...props}>
      <Link className={Styles.itemLinkCategory__link} href={href}>
        <SvgIconUrl
          className={Styles.itemLinkCategory__link_icon}
          imageUrl={icon}
          alt={title}
          size={SIZE_ICON}
        />

        <p className={Styles.itemLinkCategory__link_title}>{title}</p>

        {isWithArrow && (
          <FaAngleRight
            className={Styles.itemLinkCategory__link_arrow}
            size={10}
          />
        )}
      </Link>
    </li>
  );
};

export default ItemLinkCategory;
