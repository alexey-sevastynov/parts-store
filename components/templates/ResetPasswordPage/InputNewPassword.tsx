import Styles from '@/styles/modules/reset-password-page/index.module.scss';

import { useLang } from '@/hooks/useLang';

import { IAuthInput } from '@/types/authorization';
import { passwordValidationRules } from '@/utils/authorization';
import React from 'react';

const InputNewPassword = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang();

  const [showPassword, setShowPassword] = React.useState(false);

  // props for Image icon visible/hide
  const propsIcon = {
    className: `${
      showPassword
        ? Styles.inputNewPassword__input_button_visible
        : Styles.inputNewPassword__input_button_hide
    }`,
    src: `${showPassword ? '/img/visible.svg' : '/img/hide.svg'}`,
    alt: `${showPassword ? 'show password' : 'hide password'}`,
  };

  return (
    <div className={Styles.inputNewPassword}>
      <label className={Styles.inputNewPassword__label} htmlFor='passwordNew'>
        {translations[lang].authorization.new_password}
      </label>

      <div className={Styles.inputNewPassword__input}>
        <input
          className={Styles.inputNewPassword__input_field}
          type={showPassword ? 'text' : 'password'}
          id='passwordNew'
          {...register(
            'passwordNew',
            passwordValidationRules(
              translations[lang].validation.min_4,
              translations[lang].validation.max_20,
              translations[lang].validation.required_password
            )
          )}
        />

        <button
          className={Styles.inputNewPassword__input_button}
          type='button'
          onClick={() => setShowPassword(!showPassword)}
        >
          <img {...propsIcon} />
        </button>
      </div>

      {errors.passwordNew && (
        <span className={Styles.inputNewPassword__error}>
          {errors.passwordNew?.message}
        </span>
      )}
    </div>
  );
};

export default InputNewPassword;
