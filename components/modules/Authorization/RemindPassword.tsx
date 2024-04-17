import Styles from '@/styles/modules/authorization/index.module.scss';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';

import { Oval } from 'react-loader-spinner';
import { IoMdClose } from 'react-icons/io';

import { useAppDispatch } from '@/context/hooks';
import { useLang } from '@/hooks/useLang';

import { forgotPasswordWithCredentials } from '@/actions/authActions';

import { IInputs, messageErrorType } from '@/types/authorization';

import { COLORS } from '@/constants/colors';
import { SIZE_ICON } from '@/constants/common';

import {
  closeDropDownAuth,
  openWindowSignIn,
} from '@/context/features/modals/modals';

import { Button } from '@/components/elements/Button';

import NotificationBar from '@/components/elements/NotificationBar';
import ButtonSocialFusion from './ButtonSocialFusion';
import InputEmail from './InputEmail';

const RemindPassword = () => {
  const dispatch = useAppDispatch();
  const { lang, translations } = useLang();

  const [messageError, setMessageError] =
    React.useState<messageErrorType | null>(null);
  // possible the message :
  // 1. { msg: 'Email does not exist', status: 401 };
  // 2. { msg: 'A confirmation has been sent to the specified email address, please confirm it.', status: 201 };

  const typeMessageError =
    messageError === 'Email does not exist' ? 'error' : 'success';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted, isValid },
  } = useForm<IInputs>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    const res = await forgotPasswordWithCredentials({ email: data.email });

    setMessageError(res?.msg as messageErrorType);
  };

  return (
    <form className={Styles.remindPassword} onSubmit={handleSubmit(onSubmit)}>
      {/* _____header title and close */}
      <div className={Styles.remindPassword__head}>
        <h2 className={Styles.remindPassword__head_title}>
          {translations[lang].authorization.sign_in}
        </h2>
        <button
          className={Styles.remindPassword__head_close}
          type='button'
          onClick={() => dispatch(closeDropDownAuth())}
        >
          <IoMdClose color={COLORS.blackIcon} />
        </button>
      </div>

      {/* _____main colum left, middle line and colum right */}
      <div className={Styles.remindPassword__main}>
        {/* _____colum left */}
        <div className={Styles.remindPassword__main_left}>
          <InputEmail register={register} errors={errors} />

          {/* _____notification Error */}
          {messageError && !isSubmitting && isSubmitted && isValid && (
            <NotificationBar type={typeMessageError}>
              {/* @ts-ignore */}
              {translations[lang].authorization[messageError] || ''}
            </NotificationBar>
          )}
          <div className={Styles.remindPassword__main_left_footer}>
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
                translations[lang].authorization.reset_password
              )}
            </Button>

            <button
              className='btn-md-transparent'
              type='button'
              onClick={() => dispatch(openWindowSignIn())}
            >
              {translations[lang].authorization.remembered_password}
            </button>
          </div>
        </div>

        {/* _____middle line */}
        <div className={Styles.remindPassword__main_middle}>
          <div className={Styles.remindPassword__main_middle_line} />
          <p className={Styles.remindPassword__main_middle_text}>
            {translations[lang].authorization.or}
          </p>
          <div className={Styles.remindPassword__main_middle_line} />
        </div>

        {/* _____colum right */}
        <div className={Styles.remindPassword__main_right}>
          <h4 className={Styles.remindPassword__main_right_title}>
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

export default RemindPassword;
