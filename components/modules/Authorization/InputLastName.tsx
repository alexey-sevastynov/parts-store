import Styles from '@/styles/modules/authorization/index.module.scss';

import { useLang } from '@/hooks/useLang';
import { IAuthInput } from '@/types/authorization';
import { nameValidationRules } from '@/utils/authorization';

const InputLastName = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang();
  return (
    <div className={Styles.lastName}>
      <label className={Styles.lastName__label} htmlFor='last name'>
        {translations[lang].authorization.last_name}
      </label>
      <input
        className={Styles.lastName__input}
        type='text'
        id='last name'
        {...register(
          'lastName',
          nameValidationRules(
            translations[lang].validation.invalid_value,
            translations[lang].validation.min_2,
            translations[lang].validation.max_15,
            translations[lang].validation.requiredLastName
          )
        )}
      />

      {errors.lastName && (
        <span className={Styles.lastName__error}>
          {errors.lastName?.message}
        </span>
      )}
    </div>
  );
};

export default InputLastName;
