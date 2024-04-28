import { SIZE_ICON_BIG } from '@/constants/common';
import Styles from '@/styles/modules/dashboard/index.module.scss';
import { IAdminAsideButtonProps } from '@/types/dashboard';
import { collapseNavAdmin, expandNavAdmin } from '@/utils/common';
import React from 'react';
import { HiMenuAlt1 } from 'react-icons/hi';

const AdminAsideButton = ({ ...props }: IAdminAsideButtonProps) => {
  const [isExpandedNavMenu, setIsExpandedNavMenu] = React.useState(false);

  const handleToggle = () => {
    if (isExpandedNavMenu) {
      collapseNavAdmin();
    } else {
      expandNavAdmin();
    }
    setIsExpandedNavMenu(!isExpandedNavMenu);
  };

  return (
    <button
      className={Styles.adminAsideButton}
      {...props}
      onClick={handleToggle}
    >
      <HiMenuAlt1
        className={Styles.adminAsideButton__icon}
        size={SIZE_ICON_BIG}
      />
    </button>
  );
};

export default AdminAsideButton;
