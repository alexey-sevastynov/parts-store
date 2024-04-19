import Styles from '@/styles/modules/main-page/index.module.scss';
import Link from 'next/link';

import { IItemCategoryProps } from '@/types/main-page';
import { FaAngleRight } from 'react-icons/fa6';

const ItemCategory = ({
  href = '/',
  title,
  icon,
  isWithArrow = false,
}: IItemCategoryProps) => {
  return (
    <li className={Styles.itemCategory}>
      <Link className={Styles.itemCategory__link} href={href}>
        <div className={Styles.itemCategory__link_icon}>{icon}</div>

        <p className={Styles.itemCategory__link_title}>{title}</p>

        {isWithArrow && (
          <FaAngleRight className={Styles.itemCategory__link_arrow} size={10} />
        )}
      </Link>
    </li>
  );
};

export default ItemCategory;
