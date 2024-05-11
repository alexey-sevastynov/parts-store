import Styles from '@/styles/modules/dashboard/index.module.scss';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useLang } from '@/hooks/useLang';

import { FaBoxesStacked, FaUsers } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { RiAddBoxFill } from 'react-icons/ri';

import { ROUTES, SIZE_ICON } from '@/constants/common';

import AccordionItemAdmin from './AccordionItemAdmin';
import ItemNavAdmin from './ItemNavAdmin';

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

      <AccordionItemAdmin
        className={Styles.listNavAdmin__accordion}
        icon={<FaBoxesStacked size={SIZE_ICON} />}
        title={translations[lang].dashboard_page.characteristic}
        isActive={pathName.startsWith(ROUTES.CHARACTERISTICS)}
        href={ROUTES.CHARACTERISTICS}
      >
        <div className={Styles.listNavAdmin__accordion_list}>
          <Link href={ROUTES.CHARACTERISTICS_ADD}>
            <ItemNavAdmin
              icon={<RiAddBoxFill size={SIZE_ICON} />}
              title={translations[lang].common.add}
              isActive={pathName === ROUTES.CHARACTERISTICS_ADD}
            />
          </Link>
        </div>
      </AccordionItemAdmin>
    </ul>
  );
};

export default ListNavAdmin;
