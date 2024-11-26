import Styles from '@/styles/modules/user-profile-page/index.module.scss';
import InputEditPassword from './InputEditPassword';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Oval } from 'react-loader-spinner';
import { SIZE_ICON } from '@/constants/common';
import { COLORS } from '@/constants/colors';

import { IInputs, messageErrorType } from '@/types/authorization';
import { useLang } from '@/hooks/useLang';
import { Button } from '@/components/elements/Button';
import { changePasswordWithCredentials } from '@/actions/authActions';
import { useAppDispatch } from '@/context/hooks';
import { closePopupWindowChangePassword } from '@/context/features/modals/modals';
import React from 'react';
import NotificationBar from '@/components/elements/NotificationBar';
import { isStringInObject } from '@/utils/translation';

const PasswordChange = () => {
  const dispatch = useAppDispatch();
  const { lang, translations } = useLang();

  const [messageError, setMessageError] =
    React.useState<messageErrorType | null>(null);
  // possible the message
  // 1. { msg: 'Old password does not match!', status: 401};
  // 2. { msg: 'Changed Password Succussefully!', status: 201 };

  const typeMessageError =
    messageError === 'Old password does not match!' ? 'error' : 'success';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid, isSubmitted },
  } = useForm<IInputs>({
    mode: 'onSubmit',
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<IInputs> = async ({
    passwordNew,
    passwordOld,
  }) => {
    if (passwordOld && passwordNew && isPasswordMatch) {
      const res = await changePasswordWithCredentials({
        passwordOld,
        passwordNew,
      });

      setMessageError(res?.msg as messageErrorType);
    }
  };

  const isPasswordMatch = watch('passwordNew') === watch('password');

  return (
    <form className={Styles.passwordChange} onSubmit={handleSubmit(onSubmit)}>
      <div className={Styles.passwordChange__inputs}>
        <InputEditPassword
          labalText={translations[lang].authorization.current_password}
          name='passwordOld'
          register={register}
          errors={errors}
        />
        <InputEditPassword
          labalText={translations[lang].authorization.new_password}
          name='passwordNew'
          register={register}
          errors={errors}
        />
        <InputEditPassword
          labalText={translations[lang].authorization.new_password_repeat}
          name='password'
          register={register}
          errors={errors}
        />
      </div>

      {/* _____notification Error */}
      <div className={Styles.passwordChange__errors}>
        {!isPasswordMatch && isValid && (
          <NotificationBar type='error'>
            {translations[lang].validation.password_does_not_match}
          </NotificationBar>
        )}

        {messageError &&
          isSubmitted &&
          isStringInObject(messageError, translations[lang].authorization) && (
            <NotificationBar type={typeMessageError}>
              {translations[lang].authorization[messageError]}
            </NotificationBar>
          )}
      </div>

      <div className={Styles.passwordChange__btns}>
        <button
          className='btn-md-transparent'
          type='button'
          onClick={() => dispatch(closePopupWindowChangePassword())}
        >
          {translations[lang].common.cancel}
        </button>

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
            translations[lang].common.save
          )}
        </Button>
      </div>
    </form>
  );
};

export default PasswordChange;
