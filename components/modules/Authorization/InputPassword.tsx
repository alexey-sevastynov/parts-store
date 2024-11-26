import Styles from '@/styles/modules/authorization/index.module.scss';
import React from 'react';
import Image from 'next/image';
import { useLang } from '@/hooks/useLang';
import { IAuthInput } from '@/types/authorization';
import { passwordValidationRules } from '@/utils/authorization';

const InputPassword = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang();

  const [showPassword, setShowPassword] = React.useState(false);

  // props for Image icon visible/hide
  const propsIcon = {
    className: `${
      showPassword
        ? Styles.password__input_button_visible
        : Styles.password__input_button_hide
    }`,
    src: `${showPassword ? '/img/visible.svg' : '/img/hide.svg'}`,
    alt: `${showPassword ? 'show password' : 'hide password'}`,
  };

  return (
    <div className={Styles.password}>
      <label className={Styles.password__label} htmlFor='password'>
        {translations[lang].authorization.make_password}
      </label>

      <div className={Styles.password__input}>
        <input
          className={Styles.password__input_field}
          type={showPassword ? 'text' : 'password'}
          {...register(
            'password',
            passwordValidationRules(
              translations[lang].validation.min_4,
              translations[lang].validation.max_20,
              translations[lang].validation.required_password
            )
          )}
        />
        <button
          className={Styles.password__input_button}
          type='button'
          onClick={() => setShowPassword(!showPassword)}
        >
          <Image
            src={propsIcon.src}
            className={propsIcon.className}
            alt={propsIcon.alt}
          />
        </button>
      </div>

      {errors.password && (
        <span className={Styles.password__error}>
          {errors.password?.message}
        </span>
      )}
    </div>
  );
};

export default InputPassword;
