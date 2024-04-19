import Styles from '@/styles/elements/index.module.scss';

import { useLang } from '@/hooks/useLang';
import Link from 'next/link';
import { ThemeType } from '@/types/elements';
import { COLORS } from '@/constants/colors';

const ListInfoInternetStore = ({ theme = 'dark' }: { theme?: ThemeType }) => {
  const { lang, translations } = useLang();

  const isDarkTheme =
    theme === 'dark'
      ? { color: COLORS.whiteFont }
      : { color: COLORS.blackFont };

  return (
    <section className={Styles.listInfoInternetStore}>
      <h4 className={Styles.listInfoInternetStore__title} style={isDarkTheme}>
        {translations[lang].footer_page.online_store}
      </h4>

      <ul className={Styles.listInfoInternetStore__list}>
        <li className={Styles.listInfoInternetStore__list_item}>
          <Link href={'/'} style={isDarkTheme}>
            {translations[lang].footer_page.catalog}
          </Link>
        </li>
        <li className={Styles.listInfoInternetStore__list_item}>
          <Link href={'/'} style={isDarkTheme}>
            {translations[lang].footer_page.all_categories}
          </Link>
        </li>
        <li className={Styles.listInfoInternetStore__list_item}>
          <Link href={'/'} style={isDarkTheme}>
            {translations[lang].footer_page.spare_parts_by_manufacturer}
          </Link>
        </li>
        <li className={Styles.listInfoInternetStore__list_item}>
          <Link href={'/'} style={isDarkTheme}>
            {translations[lang].footer_page.original_catalogs}
          </Link>
        </li>
        <li className={Styles.listInfoInternetStore__list_item}>
          <Link href={'/'} style={isDarkTheme}>
            {translations[lang].footer_page.payment}
          </Link>
        </li>
        <li className={Styles.listInfoInternetStore__list_item}>
          <Link href={'/'} style={isDarkTheme}>
            {translations[lang].footer_page.delivery}
          </Link>
        </li>
        <li className={Styles.listInfoInternetStore__list_item}>
          <Link href={'/'} style={isDarkTheme}>
            {translations[lang].footer_page.returns_and_warranty}
          </Link>
        </li>
        <li className={Styles.listInfoInternetStore__list_item}>
          <Link href={'/'} style={isDarkTheme}>
            {translations[lang].footer_page.help}
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default ListInfoInternetStore;
