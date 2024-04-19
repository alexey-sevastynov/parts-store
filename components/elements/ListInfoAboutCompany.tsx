import Link from 'next/link';
import React from 'react';
import Styles from '@/styles/elements/index.module.scss';
import { useLang } from '@/hooks/useLang';

const ListInfoAboutCompany = () => {
  const { lang, translations } = useLang();
  return (
    <section className={Styles.listInfoAboutCompany}>
      <h4 className={Styles.listInfoAboutCompany__title}>
        {translations[lang].aside_panel_page.company_info}
      </h4>

      <ul className={Styles.listInfoAboutCompany__list}>
        <li className={Styles.listInfoAboutCompany__list_item}>
          <Link href={'/about'}>
            {translations[lang].aside_panel_page.about_us}
          </Link>
        </li>
        <li className={Styles.listInfoAboutCompany__list_item}>
          <Link href={'/terms'}>
            {translations[lang].aside_panel_page.terms_of_use_of_the_site}
          </Link>
        </li>
        <li className={Styles.listInfoAboutCompany__list_item}>
          <Link href={'/contacts'}>
            {translations[lang].aside_panel_page.contacts}
          </Link>
        </li>
        <li className={Styles.listInfoAboutCompany__list_item}>
          <Link href={'/categories'}>
            {translations[lang].aside_panel_page.all_categories}
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default ListInfoAboutCompany;
