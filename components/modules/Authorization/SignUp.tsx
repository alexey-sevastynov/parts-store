import Styles from '@/styles/modules/authorization/index.module.scss';

import React from 'react';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { debounce } from 'lodash';

import { useLang } from '@/hooks/useLang';

import { COLORS } from '@/constants/colors';
import { IoMdClose } from 'react-icons/io';
import { IInputs } from '@/types/authorization';

import { useAppDispatch, useAppSelector } from '@/context/hooks';

import {
  closeDropDownAuth,
  openWindowSignIn,
} from '@/context/features/modals/modals';
import { setFormDataSignUp } from '@/context/features/authorization/authorization';

import InputFirstName from './InputFirstName';
import InputLastName from './InputLastName';
import InputPhone from './InputPhone';
import InputEmail from './InputEmail';
import InputPassword from './InputPassword';
import Paragraph from '@/components/elements/Paragraph';
import { Button } from '@/components/elements/Button';
import ButtonSocialFusion from './ButtonSocialFusion';
import { createUserAccount } from '@/api/authorization';
import { Oval } from 'react-loader-spinner';
import { SIZE_ICON } from '@/constants/common';

const SignUp = () => {
  const dispatch = useAppDispatch();

  const { lang, translations } = useLang();

  const userForm = useAppSelector((state) => state.authorization.signUp.user);

  const statusAPI = useAppSelector(
    (state) => state.authorization.signUp.status
  );
  const errorMessageAPI = useAppSelector(
    (state) => state.authorization.signUp.message
  );

  const statusLoading = statusAPI === 'loading';
  const statusLoaded = statusAPI === 'success';

  const message = (code: string | null) => {
    if (code === 'Request failed with status code 400')
      return translations[lang].validation.error_email;
    if (
      code === 'Request failed with status code 500' ||
      'Request failed with status code 404'
    )
      return translations[lang].validation.error_server;
    return;
  };

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<IInputs>({
    mode: 'onBlur',
    defaultValues: {
      firstName: userForm.firstName,
      lastName: userForm.lastName,
      email: userForm.email,
      phone: '+38',
    },
  });

  const onSubmit: SubmitHandler<IInputs> = (data) => {
    dispatch(createUserAccount(data));
  };

  const updateFormDataWithDelay = debounce((data: IInputs) => {
    dispatch(setFormDataSignUp(data));
  }, 2000);

  React.useEffect(() => {
    watch((data: any) => {
      updateFormDataWithDelay(data);
    });

    return () => {
      updateFormDataWithDelay.cancel();
    };
  }, []);

  return (
    <form className={Styles.signUp} onSubmit={handleSubmit(onSubmit)}>
      {/* _____header title and close */}
      <div className={Styles.signUp__head}>
        <h2 className={Styles.signUp__head_title}>
          {translations[lang].authorization.sign_up}
        </h2>
        <button
          className={Styles.signUp__head_close}
          type='button'
          onClick={() => {
            dispatch(closeDropDownAuth());
          }}
        >
          <IoMdClose color={COLORS.blackIcon} />
        </button>
      </div>
      {/* _____main colum left, middle line and colum right */}
      <div className={Styles.signUp__main}>
        {/* _____colum left */}
        <div className={Styles.signUp__main_left}>
          <InputFirstName register={register} errors={errors} />
          <InputLastName register={register} errors={errors} />
          <InputPhone register={register} errors={errors} />
          <InputEmail register={register} errors={errors} />
          <InputPassword register={register} errors={errors} />

          <Paragraph size='sm'>
            {/* TEXT: "By registering, you agree to the terms and conditions" */}
            {translations[lang].authorization.agree}{' '}
            {/* "...provisions on the processing and protection of personal data" */}
            <Link
              className={Styles.signUp__main_left_link}
              href={'/privacy-policy'}
            >
              {translations[lang].authorization.privacy_policy}{' '}
            </Link>
            {/* "...and" */}
            {translations[lang].authorization.and} {/* "...user agreement" */}
            <Link
              className={Styles.signUp__main_left_link}
              href={'/user-agreement'}
            >
              {translations[lang].authorization.user_agreement}
            </Link>
          </Paragraph>
          {errorMessageAPI !== null && !statusLoaded && (
            <p>{message(errorMessageAPI)}</p>
          )}

          <div className={Styles.signUp__main_left_footer}>
            <Button type='submit' disabled={statusLoading}>
              {statusLoading ? (
                <Oval
                  visible={true}
                  height={SIZE_ICON}
                  width={SIZE_ICON}
                  color={COLORS.whiteFont}
                  secondaryColor={COLORS.whiteFont}
                  ariaLabel='oval-loading'
                />
              ) : (
                translations[lang].authorization.check_in
              )}
            </Button>

            <button
              className='btn-md-transparent'
              type='button'
              onClick={() => dispatch(openWindowSignIn())}
            >
              {translations[lang].authorization.registered}
            </button>
          </div>
        </div>

        {/* _____middle line */}
        <div className={Styles.signUp__main_middle}>
          <div className={Styles.signUp__main_middle_line} />
          <p className={Styles.signUp__main_middle_text}>
            {translations[lang].authorization.or}
          </p>
          <div className={Styles.signUp__main_middle_line} />
        </div>

        {/* _____colum right */}
        <div className={Styles.signUp__main_right}>
          <h4 className={Styles.signUp__main_right_title}>
            {translations[lang].authorization.log_in_as_user}
          </h4>
          <ButtonSocialFusion type='button' nameIcon='google'>
            Google
          </ButtonSocialFusion>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
