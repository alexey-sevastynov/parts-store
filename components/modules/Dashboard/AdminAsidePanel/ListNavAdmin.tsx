import Styles from '@/styles/modules/dashboard/index.module.scss';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useLang } from '@/hooks/useLang';

import { FaBoxesStacked, FaUsers } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';
import { SiBrandfolder, SiHomeassistantcommunitystore } from 'react-icons/si';
import { RiAddBoxFill } from 'react-icons/ri';

import { ROUTES, SIZE_ICON } from '@/constants/common';

import AccordionItemAdmin from './AccordionItemAdmin';
import ItemNavAdmin from './ItemNavAdmin';
import { BiSolidCategoryAlt } from 'react-icons/bi';

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

      <AccordionItemAdmin
        className={Styles.listNavAdmin__accordion}
        icon={<SiHomeassistantcommunitystore size={SIZE_ICON} />}
        title={translations[lang].dashboard_page.goods}
        isActive={pathName.startsWith(ROUTES.GOODS)}
        href={ROUTES.GOODS}
      >
        <div className={Styles.listNavAdmin__accordion_list}>
          <Link href={ROUTES.GOODS_ADD}>
            <ItemNavAdmin
              icon={<RiAddBoxFill size={SIZE_ICON} />}
              title={translations[lang].common.add}
              isActive={pathName.startsWith(ROUTES.GOODS_ADD)}
            />
          </Link>
        </div>
      </AccordionItemAdmin>

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

      <AccordionItemAdmin
        className={Styles.listNavAdmin__accordion}
        icon={<BiSolidCategoryAlt size={SIZE_ICON} />}
        title={translations[lang].dashboard_page.categories}
        isActive={pathName.startsWith(ROUTES.CATEGORIES)}
        href={ROUTES.CATEGORIES}
      >
        <div className={Styles.listNavAdmin__accordion_list}>
          <Link href={ROUTES.CATEGORIES_ADD}>
            <ItemNavAdmin
              icon={<RiAddBoxFill size={SIZE_ICON} />}
              title={translations[lang].common.add}
              isActive={pathName.startsWith(ROUTES.CATEGORIES_ADD)}
            />
          </Link>
        </div>
      </AccordionItemAdmin>

      <AccordionItemAdmin
        className={Styles.listNavAdmin__accordion}
        icon={<SiBrandfolder size={SIZE_ICON} />}
        title={translations[lang].dashboard_page.brands}
        isActive={pathName.startsWith(ROUTES.BRANDS)}
        href={ROUTES.BRANDS}
      >
        <div className={Styles.listNavAdmin__accordion_list}>
          <Link href={ROUTES.BRANDS_ADD}>
            <ItemNavAdmin
              icon={<RiAddBoxFill size={SIZE_ICON} />}
              title={translations[lang].common.add}
              isActive={pathName.startsWith(ROUTES.BRANDS_ADD)}
            />
          </Link>
        </div>
      </AccordionItemAdmin>
    </ul>
  );
};

export default ListNavAdmin;
