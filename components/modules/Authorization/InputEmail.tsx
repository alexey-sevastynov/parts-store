import Styles from '@/styles/modules/authorization/index.module.scss';

import { useLang } from '@/hooks/useLang';

import { IAuthInput } from '@/types/authorization';
import { emailValidationRules } from '@/utils/authorization';

const InputEmail = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang();
  return (
    <div className={Styles.email}>
      <label className={Styles.email__label} htmlFor='email'>
        {translations[lang].authorization.email}
      </label>
      <input
        className={Styles.email__input}
        type='email'
        {...register(
          'email',
          emailValidationRules(
            translations[lang].validation.invalid_value,
            translations[lang].validation.invalid_email
          )
        )}
      />

      {errors.email && (
        <span className={Styles.email__error}>{errors.email?.message}</span>
      )}
    </div>
  );
};

export default InputEmail;
