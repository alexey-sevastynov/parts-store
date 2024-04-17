import Styles from '@/styles/modules/user-profile-page/index.module.scss';

import React from 'react';

import { useLang } from '@/hooks/useLang';

import { IAuthInput } from '@/types/authorization';
import { passwordValidationRules } from '@/utils/authorization';

const InputEditPassword = ({
  name = 'password',
  register,
  errors,
  labalText,
}: IAuthInput) => {
  const { lang, translations } = useLang();

  const [showPassword, setShowPassword] = React.useState(false);

  // props for Image icon visible/hide
  const propsIcon = {
    className: `${
      showPassword
        ? Styles.inputEditPassword__input_button_visible
        : Styles.inputEditPassword__input_button_hide
    }`,
    src: `${showPassword ? '/img/visible.svg' : '/img/hide.svg'}`,
    alt: `${showPassword ? 'show password' : 'hide password'}`,
  };

  const requiredMessage = (
    name: 'password' | 'passwordOld' | 'passwordNew'
  ) => {
    switch (name) {
      case 'password':
        return translations[lang].validation.new_password_repeat;
      case 'passwordNew':
        return translations[lang].validation.new_password;
      case 'passwordOld':
        return translations[lang].validation.current_password;
      default:
        break;
    }
  };

  return (
    <div className={Styles.inputEditPassword}>
      <label className={Styles.inputEditPassword__label} htmlFor={name}>
        {labalText}
      </label>

      <div className={Styles.inputEditPassword__input}>
        <input
          className={Styles.inputEditPassword__input_field}
          type={showPassword ? 'text' : 'password'}
          {...register(
            name,
            passwordValidationRules(
              translations[lang].validation.min_4,
              translations[lang].validation.max_20,
              requiredMessage(name)
            )
          )}
        />
        <button
          className={Styles.inputEditPassword__input_button}
          type='button'
          onClick={() => setShowPassword(!showPassword)}
        >
          <img {...propsIcon} />
        </button>
      </div>

      {errors[name] && (
        <span className={Styles.inputEditPassword__error}>
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
};

export default InputEditPassword;
