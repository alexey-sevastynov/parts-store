import Styles from '@/styles/modules/main-page/index.module.scss';

import { useAppDispatch } from '@/context/hooks';
import { useLang } from '@/hooks/useLang';
import { signOut, useSession } from 'next-auth/react';
import UserCard from '@/components/elements/UserCard';
import Link from 'next/link';

const AuthUser = () => {
  const { data, status } = useSession();
  const dispatch = useAppDispatch();

  const isAuthenticated = status === 'authenticated';

  const { lang, translations } = useLang();

  const email = data?.user?.email || 'Unknown email';
  const firstName = data?.user?.firstName || 'Unknown';
  const lastName = data?.user?.lastName || 'user';
  const photo = data?.user.photo;

  return (
    <div className={Styles.authUser}>
      <UserCard
        firstName={firstName}
        lastName={lastName}
        email={email}
        photo={photo}
      />

      {isAuthenticated && (
        <ul className={Styles.authUser__list}>
          <li className={Styles.authUser__list_item}>
            <Link href={'/'}>{translations[lang].user_page.wish_list}</Link>
          </li>
          <li className={Styles.authUser__list_item}>
            <Link href={'/'}>{translations[lang].user_page.cart}</Link>
          </li>
          <li className={Styles.authUser__list_item}>
            <Link href={'/'}>{translations[lang].user_page.orders}</Link>
          </li>
          <li className={Styles.authUser__list_item}>
            <Link href={'/'}>{translations[lang].user_page.feedback}</Link>
          </li>
          <li className={Styles.authUser__list_item}>
            <Link href={'/'}>
              {translations[lang].user_page.viewed_products}
            </Link>
          </li>
          <button
            className={Styles.authUser__list_item}
            onClick={() => signOut({ redirect: false })}
          >
            {translations[lang].authorization.sign_out}
          </button>
        </ul>
      )}
    </div>
  );
};

export default AuthUser;
