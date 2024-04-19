import Styles from '@/styles/elements/index.module.scss';

import { useLang } from '@/hooks/useLang';
import Link from 'next/link';
import { ThemeType } from '@/types/elements';
import { COLORS } from '@/constants/colors';

const ListInfoUseful = ({ theme = 'dark' }: { theme?: ThemeType }) => {
  const { lang, translations } = useLang();

  const isDarkTheme =
    theme === 'dark'
      ? { color: COLORS.whiteFont }
      : { color: COLORS.blackFont };

  return (
    <section className={Styles.listInfoUseful}>
      <h4 className={Styles.listInfoUseful__title} style={isDarkTheme}>
        {translations[lang].footer_page.useful_information}
      </h4>

      <ul className={Styles.listInfoUseful__list}>
        <li className={Styles.listInfoUseful__list_item}>
          <Link href={'/'} style={isDarkTheme}>
            {translations[lang].footer_page.about_the_company}
          </Link>
        </li>
        <li className={Styles.listInfoUseful__list_item}>
          <Link href={'/'} style={isDarkTheme}>
            {translations[lang].footer_page.contacts}
          </Link>
        </li>
        <li className={Styles.listInfoUseful__list_item}>
          <Link href={'/'} style={isDarkTheme}>
            {translations[lang].footer_page.legal_documents}
          </Link>
        </li>
        <li className={Styles.listInfoUseful__list_item}>
          <Link href={'/'} style={isDarkTheme}>
            {translations[lang].footer_page.public_contract}
          </Link>
        </li>
        <li className={Styles.listInfoUseful__list_item}>
          <Link href={'/'} style={isDarkTheme}>
            {translations[lang].footer_page.forum}
          </Link>
        </li>
        <li className={Styles.listInfoUseful__list_item}>
          <Link href={'/'} style={isDarkTheme}>
            {translations[lang].footer_page.vacancies}
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default ListInfoUseful;
