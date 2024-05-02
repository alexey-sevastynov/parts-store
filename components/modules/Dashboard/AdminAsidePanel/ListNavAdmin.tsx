import Styles from '@/styles/modules/dashboard/index.module.scss';
import ItemNavAdmin from './ItemNavAdmin';
import { MdDashboard } from 'react-icons/md';
import { SIZE_ICON } from '@/constants/common';
import { FaUsers } from 'react-icons/fa6';
import Link from 'next/link';
import { useLang } from '@/hooks/useLang';

const ListNavAdmin = () => {
  const { lang, translations } = useLang();

  return (
    <ul className={Styles.listNavAdmin}>
      <Link href={'/'}>
        <ItemNavAdmin
          icon={<MdDashboard size={SIZE_ICON} />}
          title={translations[lang].dashboard_page.statistic}
          isActive={false}
        />
      </Link>

      <Link href={'/dashboard/customers'}>
        <ItemNavAdmin
          icon={<FaUsers size={SIZE_ICON} />}
          title={translations[lang].dashboard_page.customers}
          isActive={true}
        />
      </Link>
    </ul>
  );
};

export default ListNavAdmin;
