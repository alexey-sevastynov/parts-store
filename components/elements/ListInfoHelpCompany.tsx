import { useLang } from '@/hooks/useLang';
import Styles from '@/styles/elements/index.module.scss';

import Link from 'next/link';

const ListInfoHelpCompany = () => {
  const { lang, translations } = useLang();
  return (
    <section className={Styles.listInfoHelpCompany}>
      <h4 className={Styles.listInfoHelpCompany__title}>
        {translations[lang].aside_panel_page.help}
      </h4>

      <ul className={Styles.listInfoHelpCompany__list}>
        <li className={Styles.listInfoHelpCompany__list_item}>
          <Link href={'/delivery'}>
            {translations[lang].aside_panel_page.delivery_and_payment}
          </Link>
        </li>
        <li className={Styles.listInfoHelpCompany__list_item}>
          <Link href={'/warranty'}>
            {translations[lang].aside_panel_page.warranty}
          </Link>
        </li>
        <li className={Styles.listInfoHelpCompany__list_item}>
          <Link href={'/refund'}>
            {translations[lang].aside_panel_page.turnover_of_goods}
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default ListInfoHelpCompany;
