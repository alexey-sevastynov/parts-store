import { BREAKPOINTS } from '@/constants/breakpoints';
import { SIZE_ICON_BIG } from '@/constants/common';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import Styles from '@/styles/modules/dashboard/index.module.scss';
import { IAdminAsideButtonProps } from '@/types/dashboard';
import {
  collapseNavAdmin,
  expandNavAdmin,
  hideNavMenu,
  showNavMenu,
} from '@/utils/common';
import React from 'react';
import { HiMenu, HiMenuAlt1 } from 'react-icons/hi';
import { IoCloseOutline } from 'react-icons/io5';

const AdminAsideButton = ({ ...props }: IAdminAsideButtonProps) => {
  const isMedia768 = useMediaQuery(BREAKPOINTS.md);
  const [isExpandedNavMenu, setIsExpandedNavMenu] = React.useState(false);

  const handleToggle = () => {
    if (isExpandedNavMenu) {
      if (isMedia768) {
        hideNavMenu();
      } else {
        collapseNavAdmin();
      }
    } else {
      if (isMedia768) {
        showNavMenu();
      } else {
        expandNavAdmin();
      }
    }
    setIsExpandedNavMenu(!isExpandedNavMenu);
  };

  return (
    <button
      className={Styles.adminAsideButton}
      {...props}
      onClick={handleToggle}
    >
      {!isMedia768 && (
        <HiMenuAlt1
          className={Styles.adminAsideButton__icon}
          size={SIZE_ICON_BIG}
        />
      )}
      {isMedia768 && !isExpandedNavMenu && (
        <HiMenu
          className={Styles.adminAsideButton__icon}
          size={SIZE_ICON_BIG}
        />
      )}
      {isMedia768 && isExpandedNavMenu && (
        <IoCloseOutline
          className={Styles.adminAsideButton__icon}
          size={SIZE_ICON_BIG}
        />
      )}
    </button>
  );
};

export default AdminAsideButton;
