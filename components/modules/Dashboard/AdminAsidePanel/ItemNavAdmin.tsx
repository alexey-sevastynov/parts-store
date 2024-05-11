import Styles from '@/styles/modules/dashboard/index.module.scss';

import { IoMdArrowDropdown } from 'react-icons/io';

import { SIZE_ICON } from '@/constants/common';
import { IItemNavAdminProps } from '@/types/dashboard';

const ItemNavAdmin = ({
  icon,
  title,
  isActive = false,
  isSubMenu = false,
}: IItemNavAdminProps) => {
  return (
    <li className={Styles.itemNavAdmin}>
      {isActive && <span className={Styles.itemNavAdmin__marker} />}
      <div
        className={`${Styles.itemNavAdmin__icon} ${isActive && Styles.active}`}
      >
        {icon}
      </div>
      <p
        className={`${Styles.itemNavAdmin__title} ${isActive && Styles.active}`}
      >
        {title}
      </p>

      {isSubMenu && (
        <IoMdArrowDropdown
          className={`${Styles.itemNavAdmin__arrow} ${isActive && Styles.active}`}
          size={SIZE_ICON}
        />
      )}
    </li>
  );
};

export default ItemNavAdmin;
