import Styles from '@/styles/modules/dashboard/index.module.scss';
import ItemNavAdmin from './ItemNavAdmin';
import { MdDashboard } from 'react-icons/md';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { ROUTES, SIZE_ICON } from '@/constants/common';
import { FaBoxesStacked, FaUsers } from 'react-icons/fa6';
import Link from 'next/link';
import { useLang } from '@/hooks/useLang';
import { usePathname } from 'next/navigation';

const ListNavAdmin = () => {
  const { lang, translations } = useLang();

  const pathName = usePathname();

  return (
    <ul className={Styles.listNavAdmin}>
      <Link href={'/'}>
        <ItemNavAdmin
          icon={<MdDashboard size={SIZE_ICON} />}
          title={translations[lang].dashboard_page.statistic}
          isActive={false}
        />
      </Link>

      <Link href={ROUTES.CUSTOMERS}>
        <ItemNavAdmin
          icon={<FaUsers size={SIZE_ICON} />}
          title={translations[lang].dashboard_page.customers}
          isActive={pathName === ROUTES.CUSTOMERS}
        />
      </Link>

      <Link href={ROUTES.GOODS}>
        <ItemNavAdmin
          icon={<SiHomeassistantcommunitystore size={SIZE_ICON} />}
          title={translations[lang].dashboard_page.goods}
          isActive={pathName === ROUTES.GOODS}
        />
      </Link>

      <Link href={ROUTES.CHARACTERISTIC}>
        <ItemNavAdmin
          icon={<FaBoxesStacked size={SIZE_ICON} />}
          title={translations[lang].dashboard_page.characteristic}
          isActive={pathName === ROUTES.CHARACTERISTIC}
        />
      </Link>
    </ul>
  );
};

export default ListNavAdmin;
