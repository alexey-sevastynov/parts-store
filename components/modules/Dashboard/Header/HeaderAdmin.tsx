import Styles from '@/styles/modules/dashboard/index.module.scss';
import React from 'react';

import { FaUser, FaUsers } from 'react-icons/fa6';
import { SIZE_ICON_BIG } from '@/constants/common';
import { COLORS } from '@/constants/colors';
import { getAllUsers } from '@/actions/authActions';

import { IUser } from '@/types/user';

import AdminAsideButton from './AdminAsideButton';
import LanguagePanelAdmin from './LanguagePanelAdmin';
import InfoSmallPanel from './InfoSmallPanel';

const HeaderAdmin = () => {
  const [users, setUsers] = React.useState<IUser[]>();

  const getUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.users);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={Styles.headerAdmin}>
      <div className={Styles.headerAdmin__tools}>
        <AdminAsideButton />
        <InfoSmallPanel
          title={'Користувачів'}
          number={users?.length || 0}
          icon={<FaUsers size={SIZE_ICON_BIG} color={COLORS.green} />}
        />

        <LanguagePanelAdmin />
        <InfoSmallPanel
          title={'Адміни'}
          number={users?.filter((user) => user.role === 'admin').length || 0}
          icon={<FaUser size={SIZE_ICON_BIG} color={COLORS.red} />}
        />
      </div>

      <div className={Styles.headerAdmin__charts}>Charts here</div>
    </div>
  );
};

export default HeaderAdmin;
