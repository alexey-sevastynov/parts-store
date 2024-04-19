import Styles from '@/styles/elements/index.module.scss';

import { useLang } from '@/hooks/useLang';
import Link from 'next/link';
import { ThemeType } from '@/types/elements';
import { COLORS } from '@/constants/colors';
import { useSession } from 'next-auth/react';

const ListInfoMyAccount = ({ theme = 'dark' }: { theme?: ThemeType }) => {
  const { status } = useSession();
  const { lang, translations } = useLang();

  const isAuthenticated = status === 'authenticated';

  const isDarkTheme =
    theme === 'dark'
      ? { color: COLORS.whiteFont }
      : { color: COLORS.blackFont };

  return (
    <section className={Styles.listInfoMyAccount}>
      <h4 className={Styles.listInfoMyAccount__title} style={isDarkTheme}>
        {translations[lang].footer_page.personal_account}
      </h4>

      <ul className={Styles.listInfoMyAccount__list}>
        {isAuthenticated ? (
          <>
            <li className={Styles.listInfoMyAccount__list_item}>
              <Link href={'/'} style={isDarkTheme}>
                {translations[lang].user_page.orders}
              </Link>
            </li>
            <li className={Styles.listInfoMyAccount__list_item}>
              <Link href={'/'} style={isDarkTheme}>
                {translations[lang].user_page.viewed_products}
              </Link>
            </li>
            <li className={Styles.listInfoMyAccount__list_item}>
              <Link href={'/'} style={isDarkTheme}>
                {translations[lang].user_page.wish_list}
              </Link>
            </li>
            <li className={Styles.listInfoMyAccount__list_item}>
              <Link href={'/'} style={isDarkTheme}>
                {translations[lang].user_page.feedback}
              </Link>
            </li>
          </>
        ) : (
          <li className={Styles.listInfoMyAccount__list_item}>
            <button style={isDarkTheme}>
              {translations[lang].footer_page.sign_in_sign_up}
            </button>
          </li>
        )}
      </ul>
    </section>
  );
};

export default ListInfoMyAccount;
