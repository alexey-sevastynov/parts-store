'use client';
import Styles from '@/styles/modules/reset-password-page/index.module.scss';

import { resetPasswordWithCredentials } from '@/actions/authActions';
import { Button } from '@/components/elements/Button';

import InputEditPassword from '@/components/modules/UserProfilePage/AccountSettings/PasswordChange/InputEditPassword';
import { COLORS } from '@/constants/colors';
import { SIZE_ICON } from '@/constants/common';
import {
  closeDropDownAuth,
  openWindowSignIn,
} from '@/context/features/modals/modals';
import { useAppDispatch, useAppSelector } from '@/context/hooks';
import { IInputs, messageErrorType } from '@/types/authorization';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Oval } from 'react-loader-spinner';
import InputNewPassword from './InputNewPassword';
import { useLang } from '@/hooks/useLang';
import NotificationBar from '@/components/elements/NotificationBar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ResetPasswordPage = ({ token }: { token: string }) => {
  const dispatch = useAppDispatch();
  const session = useSession();
  const route = useRouter();
  const { lang, translations } = useLang();

  const isAuthenticated = session.status === 'authenticated';

  const isOpenAuthDropDownWindow = useAppSelector(
    (state) => state.modals.isOpenDropDownAuth.isOpen
  );

  const [messageError, setMessageError] =
    React.useState<messageErrorType | null>(null);
  // possible the message :
  // 1. { msg: 'Success! Your password has been changed.', status: 201}

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<IInputs>({
    mode: 'onBlur',
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    const password = data.passwordNew;

    console.log(password, token);

    if (password && token) {
      const res = await resetPasswordWithCredentials({ token, password });

      setMessageError(res?.msg as messageErrorType);

      console.log(res);
    }
  };

  React.useEffect(() => {
    if (isOpenAuthDropDownWindow) dispatch(closeDropDownAuth());
  }, []);

  if (isAuthenticated) {
    return (
      <section className={Styles.resetPasswordPage}>
        <div className={Styles.resetPasswordPage__title}>
          <span className={Styles.resetPasswordPage__title_circle} />
          <h1>{translations[lang].verify_page.success}</h1>
          <span className={Styles.resetPasswordPage__title_circle} />
        </div>

        <p className={Styles.resetPasswordPage__subtitle}>
          {translations[lang].reset_password_page.logged_in_as_user}{' '}
          {session.data.user.firstName}
        </p>

        <Button
          className={Styles.resetPasswordPage__btn}
          onClick={() => route.push('/')}
        >
          {translations[lang].verify_page.home_page}
        </Button>
      </section>
    );
  }
  return (
    <section className={Styles.resetPasswordPage}>
      <form
        className={Styles.resetPasswordPage__form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputNewPassword register={register} errors={errors} />

        {messageError && (
          <NotificationBar
            className={Styles.resetPasswordPage__form_notification}
            type='success'
          >
            {/* @ts-ignore */}
            {translations[lang].reset_password_page[messageError]}
          </NotificationBar>
        )}

        {messageError ? (
          <Button
            className={Styles.resetPasswordPage__form_btn}
            onClick={() => {
              dispatch(openWindowSignIn());
            }}
            type='button'
          >
            {translations[lang].authorization.sign_in}
          </Button>
        ) : (
          <Button
            className={Styles.resetPasswordPage__form_btn}
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Oval
                visible={true}
                height={SIZE_ICON}
                width={SIZE_ICON}
                color={COLORS.whiteFont}
                secondaryColor={COLORS.whiteFont}
                ariaLabel='oval-loading'
              />
            ) : (
              translations[lang].common.save
            )}
          </Button>
        )}
      </form>
    </section>
  );
};

export default ResetPasswordPage;
