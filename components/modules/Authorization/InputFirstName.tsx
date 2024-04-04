import Styles from '@/styles/modules/authorization/index.module.scss';

import { useLang } from '@/hooks/useLang';

import { IAuthInput } from '@/types/authorization';
import { nameValidationRules } from '@/utils/authorization';

const InputFirstName = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang();
  return (
    <div className={Styles.firstName}>
      <label className={Styles.firstName__label} htmlFor='first name'>
        {translations[lang].authorization.first_name}
      </label>
      <input
        className={Styles.firstName__input}
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
        <span className={Styles.firstName__error}>
          {errors.firstName?.message}
        </span>
      )}
    </div>
  );
};

export default InputFirstName;
