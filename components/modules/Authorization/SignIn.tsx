import Styles from '@/styles/modules/authorization/index.module.scss';

import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/context/hooks';
import { useLang } from '@/hooks/useLang';
import { signIn } from 'next-auth/react';

import { IoMdClose } from 'react-icons/io';
import { Oval } from 'react-loader-spinner';
import { COLORS } from '@/constants/colors';
import { SIZE_ICON } from '@/constants/common';

import { IInputs, messageErrorType } from '@/types/authorization';

import {
  closeDropDownAuth,
  openWindowRemindPassword,
  openWindowSignUp,
} from '@/context/features/modals/modals';

import { Button } from '@/components/elements/Button';
import NotificationBar from '@/components/elements/NotificationBar';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';
import ButtonSocialFusion from './ButtonSocialFusion';

const SignIn = () => {
  const dispatch = useAppDispatch();

  const { lang, translations } = useLang();

  const [messageError, setMessageError] =
    React.useState<messageErrorType | null>(null);
  // possible the message :
  // 1. { msg: 'User not found', status: 401 };
  // 2. { msg: 'Incorrect password', status: 401 };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IInputs>({
    mode: 'onBlur',
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.status === 200) dispatch(closeDropDownAuth());

    setMessageError(res?.error as messageErrorType);
  };
  return (
    <form className={Styles.signIn} onSubmit={handleSubmit(onSubmit)}>
      {/* _____header title and close */}
      <div className={Styles.signIn__head}>
        <h2 className={Styles.signIn__head_title}>
          {translations[lang].authorization.sign_in}
        </h2>
        <button
          className={Styles.signIn__head_close}
          type='button'
          onClick={() => dispatch(closeDropDownAuth())}
        >
          <IoMdClose color={COLORS.blackIcon} />
        </button>
      </div>

      {/* _____main colum left, middle line and colum right */}
      <div className={Styles.signIn__main}>
        {/* _____colum left */}
        <div className={Styles.signIn__main_left}>
          <InputEmail register={register} errors={errors} />

          <InputPassword register={register} errors={errors} />
          <div className={Styles.signIn__main_left_reminder_btn}>
            <button onClick={() => dispatch(openWindowRemindPassword())}>
              {translations[lang].authorization.password_reminder}
            </button>
          </div>

          {/* _____notification Error */}
          {messageError && (
            <NotificationBar type='error'>
              {/* @ts-ignore */}
              {translations[lang].validation[messageError]}
            </NotificationBar>
          )}

          <div className={Styles.signIn__main_left_footer}>
            <Button type='submit' disabled={isSubmitting}>
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
                translations[lang].authorization.sign_in
              )}
            </Button>

            <button
              className='btn-md-transparent'
              type='button'
              onClick={() => dispatch(openWindowSignUp())}
            >
              {translations[lang].authorization.sign_up}
            </button>
          </div>
        </div>

        {/* _____middle line */}
        <div className={Styles.signIn__main_middle}>
          <div className={Styles.signIn__main_middle_line} />
          <p className={Styles.signIn__main_middle_text}>
            {translations[lang].authorization.or}
          </p>
          <div className={Styles.signIn__main_middle_line} />
        </div>

        {/* _____colum right */}
        <div className={Styles.signIn__main_right}>
          <h4 className={Styles.signIn__main_right_title}>
            {translations[lang].authorization.log_in_as_user}
          </h4>
          <ButtonSocialFusion
            type='button'
            nameIcon='google'
            onClick={() =>
              signIn('google', { callbackUrl: '/', redirect: false }).finally(
                () => dispatch(closeDropDownAuth())
              )
            }
          >
            Google
          </ButtonSocialFusion>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
