'use client';
import Styles from '@/styles/modules/verify-page/index.module.scss';

import Image from 'next/image';

import {
  closeDropDownAuth,
  openWindowSignIn,
} from '@/context/features/modals/modals';
import { useAppDispatch } from '@/context/hooks';
import React from 'react';
import { Button } from '@/components/elements/Button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLang } from '@/hooks/useLang';

const VerifyPage = () => {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { status } = useSession();
  const { lang, translations } = useLang();

  const isAuthenticated = status === 'authenticated';

  React.useEffect(() => {
    dispatch(closeDropDownAuth());
  }, []);

  if (isAuthenticated) {
    return (
      <section className={Styles.verifyPage}>
        <div className={Styles.verifyPage__title}>
          <span className={Styles.verifyPage__title_circle} />
          <h1>{translations[lang].verify_page.success}</h1>
          <span className={Styles.verifyPage__title_circle} />
        </div>

        <p className={Styles.verifyPage__subtitle}>
          {translations[lang].verify_page.message_success}
        </p>

        <Button
          className={Styles.verifyPage__btn}
          onClick={() => route.push('/')}
        >
          {translations[lang].verify_page.home_page}
        </Button>
      </section>
    );
  }

  return (
    <section className={Styles.verifyPage}>
      <Image
        className={Styles.verifyPage__logo}
        src={'/img/congratulate.svg'}
        alt={'congratulate'}
        width={569}
        height={312}
        style={{ width: 'auto', height: 'auto' }}
      />

      <div className={Styles.verifyPage__title}>
        <span className={Styles.verifyPage__title_circle} />
        <h1>{translations[lang].verify_page.congratulation}</h1>
        <span className={Styles.verifyPage__title_circle} />
      </div>

      <p className={Styles.verifyPage__subtitle}>
        {translations[lang].verify_page.message_successfully_registered}
      </p>

      {isAuthenticated === false && (
        <Button
          className={Styles.verifyPage__btn}
          onClick={() => dispatch(openWindowSignIn())}
        >
          {translations[lang].authorization.sign_in}
        </Button>
      )}
    </section>
  );
};

export default VerifyPage;
