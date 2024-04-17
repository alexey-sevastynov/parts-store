import Styles from '@/styles/modules/user-profile-page/index.module.scss';

import { useLang } from '@/hooks/useLang';

import { IAuthInput } from '@/types/authorization';
import { nameValidationRules } from '@/utils/authorization';

const InputEditLastName = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang();

  return (
    <div className={Styles.inputEditLastName}>
      <label
        className={Styles.inputEditLastName__label}
        htmlFor='first name'
        style={{ display: 'none' }}
      >
        {translations[lang].authorization.first_name}
      </label>
      <input
        className={Styles.inputEditLastName__input}
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
        <span className={Styles.inputEditLastName__error}>
          {errors.lastName?.message}
        </span>
      )}
    </div>
  );
};

export default InputEditLastName;
