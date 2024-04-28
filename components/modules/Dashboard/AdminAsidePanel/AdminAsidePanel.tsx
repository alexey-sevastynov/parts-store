'use client';

import LogotypeSmall from '@/components/elements/LogotypeSmall';
import { COLORS } from '@/constants/colors';
import { SIZE_ICON_BIG } from '@/constants/common';
import Styles from '@/styles/modules/dashboard/index.module.scss';
import { FaCarBattery } from 'react-icons/fa6';
import ListNavAdmin from './ListNavAdmin';

const AdminAsidePanel = () => {
  return (
    <nav className={Styles.adminAsidePanel}>
      <div className={Styles.adminAsidePanel__logo}>
        <FaCarBattery color={COLORS.red} size={SIZE_ICON_BIG} />
        <LogotypeSmall theme='dark' color='red' />
      </div>

      <div className={Styles.adminAsidePanel__list}>
        <ListNavAdmin />
      </div>
    </nav>
  );
};

export default AdminAsidePanel;
