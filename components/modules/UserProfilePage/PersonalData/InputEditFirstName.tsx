import Styles from '@/styles/modules/user-profile-page/index.module.scss';

import { useLang } from '@/hooks/useLang';

import { IAuthInput } from '@/types/authorization';
import { nameValidationRules } from '@/utils/authorization';

const InputEditFirstName = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang();
  return (
    <div className={Styles.inputEditFirstName}>
      <label
        className={Styles.inputEditFirstName__label}
        htmlFor='first name'
        style={{ display: 'none' }}
      >
        {translations[lang].authorization.first_name}
      </label>
      <input
        className={Styles.inputEditFirstName__input}
        type='text'
        id='first name'
        {...register(
          'firstName',
          nameValidationRules(
            translations[lang].validation.invalid_value,
            translations[lang].validation.min_2,
            translations[lang].validation.max_15,
            translations[lang].validation.requiredFirstName
          )
        )}
      />

      {errors.firstName && (
        <span className={Styles.inputEditFirstName__error}>
          {errors.firstName?.message}
        </span>
      )}
    </div>
  );
};

export default InputEditFirstName;
